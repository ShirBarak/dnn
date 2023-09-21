'use client'

import React from 'react'
import { trpc } from './utils/trpc'
import axios from 'axios';

const ServerComp = () => {
    const {data} = trpc.coolRoute.useQuery()
  return (
    <div>this is a server component, this is the data: {data}</div>
  )
}

export default ServerComp