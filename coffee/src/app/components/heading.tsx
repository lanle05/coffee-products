import Image from "next/image";

interface StoreData {
  name: string;
  city: string;
  address: string;
  ownerName: string;
}

interface HeadingProps {
  storeData: StoreData;
}

export default function Heading({ storeData }: HeadingProps) {
  const { name, city, address, ownerName } = storeData;

  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Coffee Store Logo */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <Image
              src="/images/coffee-beans.png"
              alt="Coffee beans logo"
              width={100}
              height={100}
              className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-full"
            />
          </div>

          {/* Center: Store Info */}
          <div className="flex-1 text-center px-2 min-w-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {name}
            </h1>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-3">
              {city}
            </p>

            {/* Location Info */}
            <div className="text-sm md:text-base text-gray-700 space-y-1 md:space-y-0">
              <div className="flex items-center justify-center gap-1">
              
                <span>Location (Pick Up):</span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                <span className="text-center break-words">{address}</span>
                <a
                  href="#"
                  className="text-blue-600 hover:underline whitespace-nowrap font-medium"
                >
                  Get Direction
                </a>
              </div>
            </div>
          </div>

          {/* Right: Owner Info */}
          <div className="flex-shrink-0 flex flex-col items-center text-center order-3 md:order-none">
            <Image
              src="/images/Lola.png"
              alt="Store owner"
              width={60}
              height={60}
              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-cover rounded-full mb-2"
            />
            <p className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
              Owned by{" "}
              <span className="font-medium text-gray-900">{ownerName}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
