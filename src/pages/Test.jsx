import { useState, useEffect } from 'react'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import CharityVotingABI from '../abis/CharityVoting.json' // Your ABI

const CONTRACT_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS'

export default function Test() {
  const { address, isConnected } = useAccount()
  const [donationAmount, setDonationAmount] = useState('0.1')
  const [charities, setCharities] = useState([])
  const [selectedCharity, setSelectedCharity] = useState(0)
  const [milestones, setMilestones] = useState([])

  // 1. Fetch charities
  const { data: charityCount } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CharityVotingABI,
    functionName: 'totalCharities',
  })

  useEffect(() => {
    if (charityCount) {
      const fetchCharities = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CharityVotingABI, provider)
        
        const charityData = []
        for (let i = 0; i < charityCount; i++) {
          const charity = await contract.charities(i)
          charityData.push({
            id: i,
            name: charity.name,
            wallet: charity.wallet,
            votes: charity.votes.toString(),
            status: charity.status,
          })
        }
        setCharities(charityData)
      }
      fetchCharities()
    }
  }, [charityCount])

  // 2. Donate function
  const { config: donateConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CharityVotingABI,
    functionName: 'donate',
    value: ethers.utils.parseEther(donationAmount),
  })
  const { write: donate } = useContractWrite(donateConfig)

  // 3. Vote function
  const { write: vote } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CharityVotingABI,
    functionName: 'vote',
    args: [selectedCharity],
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Charity Voting DApp</h1>
      
      {!isConnected ? (
        <w3m-connect-button />
      ) : (
        <div className="space-y-6">
          {/* Donation Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Donate ETH</h2>
            <div className="flex gap-2">
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="border p-2 rounded"
                placeholder="ETH amount"
              />
              <button
                onClick={() => donate?.()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Donate
              </button>
            </div>
          </div>

          {/* Charity Voting Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Vote for Charities</h2>
            <select
              value={selectedCharity}
              onChange={(e) => setSelectedCharity(Number(e.target.value))}
              className="border p-2 rounded mb-4"
            >
              {charities.map((charity) => (
                <option key={charity.id} value={charity.id}>
                  {charity.name} (Votes: {charity.votes})
                </option>
              ))}
            </select>
            <button
              onClick={() => vote?.()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Vote
            </button>
          </div>

          {/* Charities List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Charities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {charities.map((charity) => (
                <div key={charity.id} className="border p-4 rounded">
                  <h3 className="font-bold">{charity.name}</h3>
                  <p>Votes: {charity.votes}</p>
                  <p>Status: {charity.status === 1 ? 'Approved' : 'Pending'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}