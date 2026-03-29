import { useQuery } from '@tanstack/react-query'
import { getNiftyLive } from '../api/liveData'

export function useLiveMarket() {
 
  const isMarketOpen = () => {
    const now = new Date()
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
    const day = ist.getDay() 
    const hour = ist.getHours()
    const min = ist.getMinutes()
    const totalMin = hour * 60 + min
    return day >= 1 && day <= 5 && totalMin >= 555 && totalMin <= 930
   
  }
  const isOpen = isMarketOpen()

  const { data: niftyData, isLoading } = useQuery({
    queryKey: ['nifty-live'],
    queryFn: getNiftyLive,
    refetchInterval: isOpen ? 60000 : false,
    staleTime: 30000,
  })

  return { niftyData, isMarketOpen: isOpen, isLoading }
}
