import { useState } from "react";
import { UserRound } from "lucide-react";
import { useProfile } from "../hooks/useProfile.js";

/**
 * Profile Page
 * User profile setup and management
 */
const Profile = () => {
  const { profile, loading, error, updateUserProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields");
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile(formData);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to update profile. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const messageIsSuccess = message.includes("successfully");

  return (
    <div className="page-shell">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-headings font-extrabold text-foreground tracking-tight flex items-center gap-3">
            <UserRound className="w-8 h-8 shrink-0 text-primary" strokeWidth={2} />
            Your Profile
          </h1>
          <p className="text-lg font-body text-muted-foreground max-w-lg">
            Update your information for referral message generation.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-border bg-red-50 text-danger px-6 py-4 text-sm font-body">
          {error}
        </div>
      )}

      {message && (
        <div
          className={`rounded-2xl border px-6 py-4 text-sm font-body ${
            messageIsSuccess
              ? "border-border bg-secondary/40 text-secondary-foreground"
              : "border-border bg-red-50 text-danger"
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-muted-foreground font-body text-sm">
          Loading profile...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card max-w-2xl w-full">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium font-body text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className="input-field"
                disabled={saving}
              />
              <p className="text-muted-foreground text-sm mt-1 font-body">
                This will appear in referral messages
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium font-body text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., john@example.com"
                className="input-field"
                disabled={saving}
              />
              <p className="text-muted-foreground text-sm mt-1 font-body">
                Contacts can reach you at this email
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium font-body text-foreground mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +1 (555) 123-4567"
                className="input-field"
                disabled={saving}
              />
              <p className="text-muted-foreground text-sm mt-1 font-body">
                Contacts can call you at this number
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`btn-primary mt-6 w-full justify-center ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}

      <div className="max-w-2xl w-full rounded-2xl border border-border bg-info-bg px-6 py-5">
        <h3 className="font-headings font-semibold text-info-text mb-2">
          Why this matters
        </h3>
        <p className="text-info-text/90 text-sm font-body leading-relaxed">
          Your profile information is used to generate personalized referral
          request messages. Keep your details accurate so contacts can reach
          you easily.
        </p>
      </div>
    </div>
  );
};

export default Profile;
