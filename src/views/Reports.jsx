import Separator from "../components/Separator"
import { StatItem } from "../components/StatItem"
import { IconDevices } from '@tabler/icons-react';
import assetService from "../services/assetService";
import { useEffect, useState } from "react";

export const Reports = () => {
  const [stats, setStats] = useState()

  const getStats = async () => {
    let response = await assetService.getStats()
    setStats({
      raw: response.data, 
      total: response.data.reduce((a, v) => a+parseInt(v.total_assets), 0),
      available: response.data.reduce((a, v) => a+parseInt(v.not_assigned_to_user), 0),
      disposed: response.data.reduce((a, v) => a+parseInt(v.disposed_assets), 0),
      assgigned: response.data.reduce((a, v) => a+parseInt(v.assigned_to_user), 0),
      not_assigned: response.data.reduce((a, v) => a+parseInt(v.not_assigned_to_user), 0)
    })
  }

  useEffect(() => {
    getStats()
  }, [])

  if (stats) {
    return(
      <section >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">Report</h1>
          <Separator />
        </div>
        <section className="flex flex-col gap-5">
          <div className="flex flex-col justify-center items-center p-5 border border-solid border-neutral-300 rounded-md">
            <span className="text-4xl font-bold">{stats.total}</span>
            <span>Total assets</span>
          </div>
          <div className="flex justify-evenly gap-5">
            <StatItem label="Available" value={stats.available} percent={`${(stats.available / stats.total * 100)}%`} icon={<IconDevices />} />
            <StatItem label="Asigned" value={stats.assgigned} percent={`${stats.assgigned / stats.total * 100}%`} icon={<IconDevices />} />
            <StatItem label="Disposed" value={stats.disposed} percent={`${stats.disposed / stats.total * 100}%`} icon={<IconDevices />} />
          </div>
          <div>
            <span>Details</span>
            <Separator />
            <div className="flex justify-evenly gap-5">
              {stats.raw.map(data => {
                return <StatItem label={data.type.toLowerCase()} value={data.total_assets} percent={`${data.total_assets/stats.total * 100}%`} />
              })}
            </div>
          </div>
        </section>
      </section>
    )
  } else {
    return <span>Loading...</span>
  }
}