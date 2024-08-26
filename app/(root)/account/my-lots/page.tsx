'use client'

import React, { useState } from 'react'

const Page = () => {
  const [activeTab, setActiveTab] = useState('Best');
  const tabData: any = {
    Best: {
        data: [
            {
                name: 'Best Lot',
                description: 'Best Lot', }
        ],
    },
    Worst: {
        data: [
            {
                name: 'Worst Lot',
                description: 'Worst Lot', }
        ],
    },
};

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4'>
        <h1 className='text-2xl font-semibold'>My Lots</h1>
      </div>
      <div className='flex flex-col w-full'>
                <div className="tabs flex border-b">
                    {Object.keys(tabData).map((tabKey) => (
                        <button
                            key={tabKey}
                            onClick={() => setActiveTab(tabKey)}
                            className={`tab text-sm mr-4 py-2  focus:outline-none ${activeTab === tabKey ? 'border-b-2  border-gray-900' : ''}`}
                        >
                            {tabKey}
                        </button>
                    ))}
                </div>
                <div className='flex flex-col gap-5'>
                    <div className="flex flex-row gap-2 flex-wrap mt-5">
                        {Object.keys(tabData).map((tabKey) => (
                            activeTab === tabKey && (
                                tabData[tabKey].data.map((pick: any, index: number) => (
                                    <p key={index} className='text-lg font-semibold'>{pick.name}</p>
                                ))

                            )
                        ))}
                    </div>
                </div>

    </div>
    </div>
  )
}

export default Page