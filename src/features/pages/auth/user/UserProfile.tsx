import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLoadingSelector, authUserSelector } from '../../../../store/auth/slice/auth.slice';
import type { IAuthUser } from '../../../../core/interfaces/auth.interface';
import { updateCurrentUser } from '../../../../store/auth/thunks/auth.thunks';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(authUserSelector);
  const loading = useSelector(authLoadingSelector);

  const [formData, setFormData] = useState<Partial<IAuthUser>>(() => ({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber,
    address: currentUser?.address || '',
    profileImage: currentUser?.profileImage || '',
  }));

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentUser && !formData.firstName && !formData.lastName && !formData.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber,
        address: currentUser.address || '',
        profileImage: currentUser.profileImage || '',
      });
    }
  }, [currentUser, formData.firstName, formData.lastName, formData.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phoneNumber' ? (value ? Number(value) : undefined) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log(selectedFile)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const updates: Partial<IAuthUser> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        profileImage: formData.profileImage,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await dispatch(updateCurrentUser(updates) as any);
        alert('Profile updated successfully!');
      } catch {
        alert('Failed to update profile');
      }
  };

  if (!currentUser) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow rounded-lg">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload h-8 w-8" aria-hidden="true">
                    <path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  </svg>
                )}
              </div>
              <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span>Change</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  title="first name"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  title="last name"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  title="email address"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleInputChange}
                  title="phone number"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  title="address"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <button
            className="inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 text-sm w-full disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;