import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardIcon, LeaderboardIcon } from '../../icons'
import StyledButton from '../Buttons/StyledButton'
import ConnectedWallet from './ConnectedWallet'

declare global {
  interface Window {
    ethereum: any
  }
}

export default function Navbar() {
  const [address, setAddress] = useState('')
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      var res = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      var addr =
        res.toString().substring(0, 6) + '...' + res.toString().substr(-6)
      setAddress(addr.toUpperCase())
    }
  }
  const disconnectWallet = async () => {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }],
    })
    setAddress('')
  }
  return (
    <div
      className='flex justify-between items-center px-5 py-4'
      style={{ borderBottom: 'solid #E5EBF2 1px' }}
    >
      <div className='flex justify-between items-center' style={{ width: 248 }}>
        <img
          src='/brand-logo-mark.png'
          alt='aster'
          style={{ height: 36, width: 36 }}
        />
        <p className='text-xl font-semibold' style={{ color: '#221D3C' }}>
          Aster Identity Scoring
        </p>
      </div>
      <div className='flex'>
        <Link
          to='/'
          className='flex items-center justify-between mr-8'
          style={{ width: 106, cursor: 'pointer' }}
        >
          <DashboardIcon
            color={
              window.location.pathname.replaceAll('/', '') === ''
                ? 'black'
                : '#706f71'
            }
          />
          <p
            className='font-semibold'
            style={{
              color:
                window.location.pathname.replaceAll('/', '') === ''
                  ? 'rgba(0, 0, 0, 0.82)'
                  : '#706f71',
            }}
          >
            Dashboard
          </p>
        </Link>
        <Link
          to='/leaderboard'
          className='flex items-center justify-between mr-12'
          style={{ width: 120, cursor: 'pointer' }}
        >
          <LeaderboardIcon
            color={
              window.location.pathname
                .replaceAll('/', '')
                .endsWith('leaderboard')
                ? 'black'
                : '#706f71'
            }
          />
          <p
            className='font-semibold'
            style={{
              color: window.location.pathname
                .replaceAll('/', '')
                .endsWith('leaderboard')
                ? 'rgba(0, 0, 0, 0.82)'
                : '#706f71',
            }}
          >
            Leaderboard
          </p>
        </Link>
        {address ? (
          <div onClick={disconnectWallet}>
            <ConnectedWallet address={address} />
          </div>
        ) : (
          <div onClick={connectWallet}>
            <StyledButton text='Connect Wallet' />
          </div>
        )}
      </div>
    </div>
  )
}