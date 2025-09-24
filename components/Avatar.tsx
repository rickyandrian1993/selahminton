import selahminton from '@/assets/avatar.jpg'
import Image from 'next/image'

export default function Avatar() {
  return (
    <>
      <div className="w-32 h-32 rounded-full mx-auto relative overflow-hidden mb-2">
        <Image
          priority
          sizes="100"
          fill
          src={selahminton}
          alt="KYRA OUTWEAR"
          className="object-cover rounded-full"
        />
      </div>
      <h1 className="text-2xl font-bold mb-1">SELAHMINTON</h1>
      <p className="text-sm text-gray-500">
        Fun Badminton Community, Good Vibes, All Levels Welcome!
      </p>
    </>
  )
}
