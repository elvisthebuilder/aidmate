'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useTheme } from '@/contexts/ThemeContext'

interface UserProfile {
  id?: string
  user_id?: string
  first_name?: string
  last_name?: string
  display_name?: string
  phone_number?: string
  date_of_birth?: string
  gender?: string
  blood_type?: string
  allergies?: string
  medical_conditions?: string
  current_medications?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
}

interface UserSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserSettings({ isOpen, onClose }: UserSettingsProps) {
  const { theme } = useTheme()
  const [profile, setProfile] = useState<UserProfile>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isOpen) {
      fetchProfile()
    }
  }, [isOpen])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      if (data) setProfile(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    setSaving(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const profileData = {
        ...profile,
        user_id: user.id,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData)

      if (error) throw error
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl ${
        theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${
            theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={profile.first_name || ''}
                  onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={profile.last_name || ''}
                  onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Display Name"
                  value={profile.display_name || ''}
                  onChange={(e) => setProfile({...profile, display_name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={profile.phone_number || ''}
                  onChange={(e) => setProfile({...profile, phone_number: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={profile.date_of_birth || ''}
                  onChange={(e) => setProfile({...profile, date_of_birth: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <select
                  value={profile.gender || ''}
                  onChange={(e) => setProfile({...profile, gender: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Health Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Health Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={profile.blood_type || ''}
                  onChange={(e) => setProfile({...profile, blood_type: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Allergies"
                    value={profile.allergies || ''}
                    onChange={(e) => setProfile({...profile, allergies: e.target.value})}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Medical Conditions"
                    value={profile.medical_conditions || ''}
                    onChange={(e) => setProfile({...profile, medical_conditions: e.target.value})}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Current Medications"
                    value={profile.current_medications || ''}
                    onChange={(e) => setProfile({...profile, current_medications: e.target.value})}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Emergency Contact Name"
                  value={profile.emergency_contact_name || ''}
                  onChange={(e) => setProfile({...profile, emergency_contact_name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <input
                  type="tel"
                  placeholder="Emergency Contact Phone"
                  value={profile.emergency_contact_phone || ''}
                  onChange={(e) => setProfile({...profile, emergency_contact_phone: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
              <button
                onClick={onClose}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}