import React from 'react'

const UserProfile:React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <form className="space-y-6 bg-white p-8 shadow rounded-lg">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload h-8 w-8" aria-hidden="true">
                  <path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                </svg>
              </div>
              <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span>Change</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
              </label>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="relative rounded-md shadow-sm">
                <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" name="firstName" title="first name" />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <div className="relative rounded-md shadow-sm">
                <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" name="lastName" title="last name" />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative rounded-md shadow-sm">
                <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" type="email" name="email" title="email address" />
              </div>
            </div>
          </div>
        <div className="sm:col-span-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="relative rounded-md shadow-sm">
              <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" name="phone" title="phone number" />
            </div>
          </div>
        </div>
        <div className="sm:col-span-6">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="relative rounded-md shadow-sm">
              <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" name="address" title="address" />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <button className="inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 text-sm w-full" type="submit">
          Save Changes
        </button>
      </div>
      </form>
    </div>
  )
}

export default UserProfile;