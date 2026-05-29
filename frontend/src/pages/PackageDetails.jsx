import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Users,
  CalendarDays,
  Languages,
  Mountain,
  Clock3,
  Check,
  X,
  Heart,
  BadgeCheck,
  Plane,
  Hotel,
  Car,
  Train,
  Landmark,
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import axios from "axios";


const galleryImages = [
  "https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
];

const highlights = [
  {
    title: "Sigiriya Rock Fortress",
    subtitle: "UNESCO World Heritage Site",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Tea Plantation Tour",
    subtitle: "Nuwara Eliya Highlands",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Yala Safari",
    subtitle: "Leopards & elephants",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Temple of the Tooth",
    subtitle: "Sacred Kandy Temple",
    image:
      "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Galle Fort & Mirissa",
    subtitle: "Colonial coast & beaches",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Scenic Train Ride",
    subtitle: "Sri Lanka railway",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop",
  },
];

const itinerary = [
  {
    day: "1",
    title: "Arrival in Colombo",
    desc: "Airport pickup, hotel check-in and welcome dinner.",
  },
  {
    day: "2",
    title: "Colombo City Tour",
    desc: "Explore temples, museums and colonial landmarks.",
  },
  {
    day: "3",
    title: "Sigiriya & Dambulla",
    desc: "Climb the rock fortress and visit cave temples.",
  },
  {
    day: "4-5",
    title: "Yala National Park",
    desc: "Wildlife safari and luxury eco-stay experience.",
  },
  {
    day: "6-7",
    title: "Ella & Scenic Train",
    desc: "Tea estates, Nine Arch Bridge and train journey.",
  },
  {
    day: "8",
    title: "Kandy & Temple",
    desc: "Visit sacred temple and cultural performance.",
  },
  {
    day: "9",
    title: "Galle Fort & Mirissa",
    desc: "Explore the fort and relax by the beach.",
  },
  {
    day: "10",
    title: "Departure",
    desc: "Transfer to airport after breakfast.",
  },
];


const reviews = [
  {
    name: "Nadia Rahman",
    review:
      "Absolutely flawless trip. The safari and scenic train ride were unforgettable!",
  },
  {
    name: "James Kowalski",
    review:
      "Great itinerary and smooth logistics. Hotels and guides were excellent.",
  },
  {
    name: "Sana Perera",
    review:
      "Perfect mix of adventure and relaxation. Highly recommended.",
  },
];

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6 p-5">
      <div className="h-[350px] rounded-3xl bg-slate-200" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <div className="h-60 rounded-3xl bg-slate-200" />
          <div className="h-60 rounded-3xl bg-slate-200" />
          <div className="h-[500px] rounded-3xl bg-slate-200" />
        </div>

        <div className="space-y-6">
          <div className="h-96 rounded-3xl bg-slate-200" />
          <div className="h-72 rounded-3xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default function PackageDetailsPage() {
    //const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [openGallery, setOpenGallery] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [packageData, setPackageData] = useState(null);

  const API_BASE_URL = "http://localhost:8085"; // change if needed
  const API_VERSION =  "/api/v1";
  const id = "6a16b396d7e3e871ee6c66ed";

  

  

  const fetchPackage = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
            `${API_BASE_URL}${API_VERSION}/packages/${id}`,
            {withCredentials: true}
        )

        console.log("Response:", response.data.data);
        setPackageData(response.data.data);

      } catch (err) {
        console.error("Failed to load package", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchPackage();
    }, [id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
            closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


  if (loading) return <Skeleton />;

  const packageImages =
    packageData?.images?.length > 0
        ? packageData.images
        : galleryImages;

  const visibleImages = packageImages.slice(0, 5);
  const remainingCount = Math.max(packageImages.length - 5,0);
  const hasMultipleImages = packageImages.length > 1;
  const tax = packageData.tax || 0;
  const discount = packageData.discount || 0;

  const TotalEstimate = ((packageData?.price || 0) + tax - discount).toLocaleString();

  const openModal = (index) => {
    setSelectedImage(index);
    setOpenGallery(true);

    // prevent background scroll
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpenGallery(false);

    // restore scroll
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === packageImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? packageImages.length - 1 : prev - 1
    );
  };

  


  if (!packageData) {
    return (
      <div className="p-10 text-red-500">
        Failed to load package
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-10">
      {/* HERO */}
        <section className="relative h-[320px] md:h-[420px] overflow-hidden">
        <img
            src={packageData.images?.[0]}
            alt={packageData.name}
            className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-5 pb-12 w-full text-white">
            <h1 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
                {packageData.name}
            </h1>

            <div className="flex flex-wrap gap-4 mt-5 text-sm md:text-base">
                <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    {packageData.destination?.city}
                </div>

                <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    {packageData.duration}
                </div>

                <div className="flex items-center gap-2">
                    <Users size={18} />
                    Max {packageData.maxPeople} People
                </div>

                <div className="flex items-center gap-1">
                    <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                    />
                    4.8 (124 reviews)
                </div>
            </div>
            </div>
        </div>
        </section>

        {/* GALLERY */}
        
        <section className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Large Image */}
            <div
                className="cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => openModal(0)}
            >
            <img
                src={visibleImages[0]}
                className="rounded-3xl h-[340px] object-cover w-full"
            />
            </div>

            {/* Small Grid */}
            {hasMultipleImages && (
            <div className="grid grid-cols-2 gap-4">
                {visibleImages.slice(1).map((img, index) => {
                    const actualIndex = index + 1;
                    const isLast = index === 3;

                    return (
                    <div
                        key={index}
                        onClick={() => openModal(actualIndex)}
                        className="relative overflow-hidden rounded-3xl cursor-pointer"
                    >
                        <img
                        src={img}
                        alt=""
                        className="w-full h-[162px] object-cover transition-transform duration-500 hover:scale-110"
                        />

                        {/* LAST IMAGE OVERLAY */}
                        {isLast && remainingCount > 0 && (
                        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                            <div className="text-center text-white">
                            <h3 className="text-3xl font-bold">
                                +{remainingCount}
                            </h3>

                            <p className="text-sm mt-1">
                                More Photos
                            </p>
                            </div>
                        </div>
                        )}
                    </div>
                    );
                })}
            </div>
            )}
        </div>
        </section>

        {/* MODAL */}
        {openGallery && (
            <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center">
            
            {/* CLOSE */}
            <button
                onClick={closeModal}
                className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full"
            >
                <X size={28} />
            </button>

            {/* LEFT BUTTON */}
            <button
                onClick={prevImage}
                className="absolute left-5 md:left-10 text-white bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full"
            >
                <ChevronLeft size={32} />
            </button>

            {/* IMAGE */}
            <div className="w-full max-w-6xl px-5">
                <img
                src={packageImages[selectedImage]}
                alt=""
                className="w-full max-h-[85vh] object-contain rounded-2xl"
                />

                {/* THUMBNAILS */}
                <div className="flex gap-3 overflow-x-auto mt-5 pb-2">
                {packageImages.map((img, index) => (
                    <img
                    key={index}
                    src={img}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all ${
                        selectedImage === index
                        ? "border-white"
                        : "border-transparent opacity-70"
                    }`}
                    />
                ))}
                </div>
            </div>

            {/* RIGHT BUTTON */}
            <button
                onClick={nextImage}
                className="absolute right-5 md:right-10 text-white bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full"
            >
                <ChevronRight size={32} />
            </button>
            </div>
        )}
    

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-5 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* LEFT */}
          <div className="space-y-8">
            {/* ABOUT */}
            <div className="bg-white rounded-3xl p-7 border-t-4 border-t-cyan-500">
              <h2 className="text-2xl font-bold mb-5">
                About this package
              </h2>

              <p className="text-slate-600 leading-8">
                {packageData.description}
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div className="bg-white rounded-3xl p-7 border-t-4 border-t-cyan-500">
              <h2 className="text-2xl font-bold mb-6">
                Package highlights
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ITINERARY */}
            <div className="bg-white rounded-3xl p-7 border-t-4 border-t-cyan-500">
              <h2 className="text-2xl font-bold mb-8">
                Day-by-day itinerary
              </h2>

              <div className="space-y-8">
                {itinerary.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-5"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
                        {item.day}
                      </div>

                      {index !== itinerary.length - 1 && (
                        <div className="w-[2px] flex-1 bg-slate-200 mt-2" />
                      )}
                    </div>

                    <div className="pb-5">
                      <h3 className="font-semibold text-lg">
                        {item.title}
                      </h3>

                      <p className="text-slate-500 mt-1 leading-7">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INCLUDED */}
            <div className="bg-white rounded-3xl p-7 border-t-4 border-t-cyan-500">
              <h2 className="text-2xl font-bold mb-8">
                What's included
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-semibold mb-5 text-lg">
                    Included
                  </h3>

                  <div className="space-y-4">
                    {packageData.included?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <Check className="text-green-500" size={18} />
                        <span className="text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-5 text-lg">
                    Not Included
                  </h3>

                  <div className="space-y-4">
                    {packageData.excluded?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <X className="text-red-500" size={18} />
                        <span className="text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="bg-white rounded-3xl p-7 border-t-4 border-t-cyan-500">
              <h2 className="text-2xl font-bold mb-8">
                Traveller reviews
              </h2>

              <div className="flex flex-col md:flex-row md:items-center gap-8 border-b pb-8">
                <div>
                  <div className="text-5xl font-bold">4.8</div>

                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-500 mt-2">
                    124 reviews
                  </p>
                </div>

                <div className="flex-1 space-y-3">
                  {[80, 65, 35, 15, 5].map((value, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="text-sm w-3">
                        {5 - index}
                      </span>

                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          style={{ width: `${value}%` }}
                          className="h-full bg-yellow-400"
                        />
                      </div>

                      <span className="text-sm text-slate-500">
                        {value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8 mt-8">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-semibold">
                      {review.name.slice(0, 2)}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-semibold">
                          {review.name}
                        </h4>

                        <span className="text-sm text-slate-400">
                          2 months ago
                        </span>
                      </div>

                      <p className="text-slate-600 mt-2 leading-7">
                        {review.review}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-10 border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white transition-all px-6 py-3 rounded-xl font-medium">
                View all reviews
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="sticky top-6 space-y-6">
              {/* PRICE CARD */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="bg-cyan-500 text-white p-7">
                  <p className="text-sm opacity-90">
                    Starting From
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    Rs. {packageData.price?.toLocaleString()}
                  </h2>

                  <p className="mt-1 opacity-90">
                    Per Person
                  </p>
                </div>

                <div className="p-7 space-y-5">
                  <div className="flex justify-between text-slate-600">
                    <span>Base price</span>
                    <span>Rs. {packageData.price?.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Taxes & fees</span>
                    <span>Rs.{tax.toLocaleString() || 0}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Couple discount</span>
                    <span>-Rs.{discount.toLocaleString() || 0}</span>
                  </div>

                  <div className="border-t pt-5 flex justify-between text-xl font-bold">
                    <span>Total estimate</span>
                    <span>Rs.{TotalEstimate}</span>
                  </div>

                  <button className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                    <CalendarDays size={18} />
                    Book this package
                  </button>

                  <button className="w-full border border-cyan-500 text-cyan-600 hover:bg-cyan-50 transition-all py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                    <Heart size={18} />
                    Save to Wishlist
                  </button>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <BadgeCheck size={18} />
                      Free cancellation up to 14 days
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <ShieldCheck size={18} />
                      Instant booking confirmation
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Clock3 size={18} />
                      24/7 travel support included
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK FACTS */}
              <div className="bg-white rounded-3xl p-7 border-t-4 border-t-cyan-500">
                <h2 className="text-xl font-bold mb-6">
                  Quick facts
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Users size={18} />
                      Max Group size
                    </div>

                    <span className="font-medium">{packageData.maxPeople} People</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-3 text-slate-600">
                      <CalendarDays size={18} />
                      Duration
                    </div>

                    <span className="font-medium">
                      {packageData.duration}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Languages size={18} />
                      Language
                    </div>

                    <span className="font-medium">
                      English
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mountain size={18} />
                      Category
                    </div>

                    <span className="font-medium">
                      {packageData.destination?.category}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-3 text-slate-600">
                      <MapPin size={18} />
                      Destination
                    </div>

                    <span className="font-medium">
                      {packageData.destination?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* HELP CARD */}
              <div className="bg-white rounded-3xl p-7 border-t-4 border-t-cyan-500">
                <h2 className="text-xl font-bold">
                  Need help deciding?
                </h2>

                <p className="text-slate-500 mt-3 leading-7">
                  Our travel experts are here to answer questions
                  and help customize your package.
                </p>

                <button className="mt-6 w-full border border-slate-300 hover:border-cyan-500 hover:text-cyan-600 transition-all py-4 rounded-2xl font-medium flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Chat with an Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}