import React, { useState, useRef, useEffect } from 'react';
import { createReport } from '../services/api';
import PriorityBadge from '../components/PriorityBadge';
import CategoryBadge from '../components/CategoryBadge';
import { 
  UploadCloud, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  RotateCw, 
  ArrowLeft, 
  Image as ImageIcon,
  Camera,
  X,
  Sparkles,
  ShieldCheck,
  Navigation,
  RefreshCw
} from 'lucide-react';

export default function FileComplaintPage({ 
  useMock = false, 
  onNavigate = () => {},
  onReportCreated = () => {} 
}) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [createdReport, setCreatedReport] = useState(null);

  // Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [camStream, setCamStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Location state
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setError(null);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
  };

  // Camera logic
  const openCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const isInsecure = window.location.protocol !== 'https:' && window.location.hostname !== 'localhost';
      if (isInsecure) {
        const dest = window.location.href.replace(window.location.hostname, 'localhost');
        if (window.confirm('Camera requires localhost.\n\nOpen http://localhost:4000 now?')) {
          window.location.replace(dest);
        }
      } else {
        window.alert('Camera is not available in this browser.');
      }
      return;
    }
    setIsCameraOpen(true);
    startStream();
  };

  const startStream = async () => {
    stopStream();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false
      });
      setCamStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      closeCamera();
      window.alert('Camera access denied or unavailable: ' + err.message);
    }
  };

  const stopStream = () => {
    if (camStream) {
      camStream.getTracks().forEach(t => t.stop());
      setCamStream(null);
    }
  };

  const closeCamera = () => {
    stopStream();
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;
    canvas.width = vw;
    canvas.height = vh;
    canvas.getContext('2d').drawImage(video, 0, 0, vw, vh);
    
    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setError(null);
      closeCamera();
    }, 'image/jpeg', 0.9);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  useEffect(() => {
    if (isCameraOpen) {
      startStream();
    }
    return () => {
      stopStream();
    };
  }, [facingMode]);

  // Geolocation logic
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
          const data = await res.json();
          if (data && data.display_name) {
            // Simplify address to just road, suburb, city
            const p = data.address;
            const simplified = [p.road, p.suburb, p.city || p.town].filter(Boolean).join(', ');
            setLocation(simplified || data.display_name);
          } else {
            setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          }
        } catch (err) {
          setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocError('Location access denied or unavailable.');
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!photoFile) {
      setError('Please attach an evidence photo of the civic issue.');
      return;
    }
    if (!location.trim()) {
      setError('Please provide the location or landmark of the incident.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('location', location.trim());
    formData.append('description', description.trim());

    const result = await createReport(formData, { useMock });

    setSubmitting(false);

    if (result.error) {
      setError(result.error.message || 'Failed to submit complaint. Make sure the backend server is running.');
    } else {
      setCreatedReport(result.data);
      onReportCreated(result.data);
    }
  };

  const resetForm = () => {
    removePhoto();
    setLocation('');
    setDescription('');
    setCreatedReport(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-2 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-600" />
            File a Civic Grievance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit photographic evidence and location. Census AI vision models classify and prioritize civic hazards automatically.
          </p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Success Confirmation Card */}
      {createdReport ? (
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Grievance Successfully Registered
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Complaint Case #{createdReport.id}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your report has been received and prioritized by the Census AI automated intake engine.
              </p>

              {/* Assessment Summary Box */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Classified Category</span>
                  <div className="mt-1">
                    <CategoryBadge category={createdReport.category} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Priority Assessment</span>
                  <div className="mt-1">
                    <PriorityBadge priority={createdReport.priority} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Priority Score</span>
                  <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5 flex items-baseline gap-1">
                    {createdReport.priority_score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('Dashboard')}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" /> View on Dashboard
                </button>
                <button
                  onClick={() => onNavigate('TrackComplaint')}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition cursor-pointer"
                >
                  Track Complaint Progress
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 transition cursor-pointer"
                >
                  File Another Report
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
          
          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Submission Notice</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* 1. Evidence Photo Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              1. Incident Evidence Photo <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Attach a clear photo of the pothole, water leakage, or garbage hazard.
            </p>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition ${
                  photoFile && !isCameraOpen ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <UploadCloud className="w-4 h-4" /> From Files
              </button>
              <button
                type="button"
                onClick={openCamera}
                className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition ${
                  isCameraOpen ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Camera className="w-4 h-4" /> Use Camera
              </button>
            </div>

            {photoPreview ? (
              <div className="relative rounded-xl border border-slate-200 overflow-hidden max-w-sm h-52 bg-slate-100 group mx-auto">
                <img 
                  src={photoPreview} 
                  alt="Evidence preview" 
                  className="w-full h-full object-cover" 
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
                  title="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white font-medium">
                  {photoFile?.name} ({Math.round((photoFile?.size || 0) / 1024)} KB)
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/40 rounded-xl p-6 text-center cursor-pointer transition-colors max-w-sm mx-auto"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoSelect}
                  accept="image/*"
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 shadow-2xs">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  JPEG or PNG up to 5MB
                </p>
              </div>
            )}
          </div>

          {/* 2. Location Field */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              2. Incident Location / Ward Landmark <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. MG Road near bus stop, Ward 12"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="button"
                onClick={detectLocation}
                disabled={locating}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
              >
                {locating ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5 text-red-500" />}
                Detect
              </button>
            </div>
            {locError && <p className="text-[10px] text-red-500 mt-1">{locError}</p>}
            <p className="text-[10px] text-slate-400 mt-1">
              Include specific street name, junction, or nearby public landmark.
            </p>
          </div>

          {/* 3. Description Field */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              3. Problem Description <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the severity, traffic obstruction, or health hazard..."
              rows={3}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* AI Intake Notice */}
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-2 text-xs text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Census AI Autonomous Intake:</strong> The uploaded image is processed by multimodal Gemini vision classification to detect category, severity score, and municipal priority.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('Dashboard')}
              className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-[#0F4C81] hover:bg-blue-900 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Analysing with AI...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Complaint</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Camera Modal overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Camera className="w-5 h-5 text-slate-500" /> Take Photo
              </h3>
              <button onClick={closeCamera} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative bg-black w-full aspect-video flex items-center justify-center">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              {/* Optional switch camera button overlay if multiple cameras available (omitted for brevity, could be added) */}
              <button 
                onClick={switchCamera}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition"
                title="Switch Camera"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 flex justify-center border-t border-slate-200">
              <button 
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full border-4 border-blue-200 bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-md flex items-center justify-center transition-all cursor-pointer"
                title="Capture Photo"
              >
                <div className="w-14 h-14 rounded-full border-2 border-white/50"></div>
              </button>
            </div>
          </div>
          {/* Hidden canvas for taking snapshot */}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}
    </div>
  );
}
