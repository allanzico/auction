'use client'

import React, { useEffect, useState } from 'react'
import {useInView} from 'react-intersection-observer'
import { LoadingSpinner } from './LoadingSpinner'
import { displayAllAuctions } from '@/actions/auction'

let page = 2
const LoadMore = () => {
    const {ref, inView } = useInView() 
    const [data, setData] = useState <any>([])

    useEffect(() => {
        if (inView) {
            displayAllAuctions(page).then((res: any) => {
                setData([...data, ...res])
                page++
            })
        }
    }, [inView, data])

  return (
    <>
          <div className="flex flex-row flex-wrap justify-between p-5">
      { data}
    </div>
    <section>
        <div ref={ref}>
            <LoadingSpinner />
        </div>
    </section>
    </>
  )
}

export default LoadMore