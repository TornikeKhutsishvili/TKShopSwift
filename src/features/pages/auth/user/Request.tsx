import React from 'react'

const Request:React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck h-6 w-6 text-gray-400" aria-hidden="true">
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                      <circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-indigo-600 truncate">Jane Smith</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true">
                      <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                    </svg>
                    <p>Wednesday</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock shrink-0 ml-4 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true">
                      <path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <p>18:00</p>
                  </div>
                </div>
              </div>
              <div className="ml-2 shrink-0 flex">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">pending</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Request;