import React, { useState } from 'react';
import { 
  Star, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ArrowLeft,
  Building,
  ThumbsUp
} from 'lucide-react';

export default function FeedbackPage({ reports = [], onNavigate = () => {} }) {
  const [complaintId, setComplaintId] = useState(reports[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('speed');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setComments('');
    setRating(5);
  };

  return (
    <div className="max-w-2xl mx-auto py-2 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            Citizen Feedback & Redressal Rating
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Help us improve municipal efficiency by rating completed grievance redressals.
          </p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center shadow-xs space-y-4 animate-in fade-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Thank You for Your Civic Feedback!
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your feedback has been logged in the Municipal Grievance Audit System to evaluate zonal officer response times and quality benchmarks.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('Dashboard')}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
            >
              Return to Dashboard
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
            >
              Submit Another Review
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          
          {/* Complaint ID */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Complaint Reference Case ID <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="e.g. b02e17ac-9dd8-4a38-ba26-3dc0bfe8e9cf"
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800 font-mono"
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Overall Satisfaction with Resolution Quality
            </label>
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-slate-300 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-2">
                {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                {rating === 4 && '⭐⭐⭐⭐ Good'}
                {rating === 3 && '⭐⭐⭐ Satisfactory'}
                {rating === 2 && '⭐⭐ Needs Improvement'}
                {rating === 1 && '⭐ Poor'}
              </span>
            </div>
          </div>

          {/* Primary Factor */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Primary Aspect of Service
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800"
            >
              <option value="speed">Speed of Resolution / Rapid Response</option>
              <option value="quality">Quality & Permanence of Repair Work</option>
              <option value="communication">Field Officer Communication & Updates</option>
              <option value="cleanliness">Site Cleanliness Post-Repair</option>
            </select>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Citizen Comments & Suggestions
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Share your experience with the municipal crew..."
              rows={4}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Citizen Feedback</span>
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
