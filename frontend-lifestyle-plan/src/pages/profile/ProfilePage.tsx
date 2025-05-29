import { ProfileForm } from "@/components";
import type { ProfileFormValues } from "@/schemas";

const ProfilePage = () => {
  const handleSubmit = (data: ProfileFormValues) => {
    console.log("Profile data:", data);
    // Submit to your API
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      <ProfileForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ProfilePage;
