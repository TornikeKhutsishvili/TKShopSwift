import React from 'react'

const FindCourier:React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Find a Courier</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="shrink-0 h-12 w-12">
                <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Courier" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Jane Smith</h3>
                <p className="text-sm text-gray-500">Bike</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <span>Available: </span>3<span> days/week</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindCourier;