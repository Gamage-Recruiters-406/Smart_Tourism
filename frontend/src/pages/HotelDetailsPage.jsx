import { useMemo, useState } from "react";
import {
	ArrowLeft,
	BedDouble,
	CalendarDays,
	CheckCircle2,
	ChevronRight,
	Clock3,
	Compass,
	Heart,
	MapPin,
	ParkingCircle,
	PhoneCall,
	Sparkles,
	Star,
	TentTree,
	UtensilsCrossed,
	Wifi,
	Waves,
	Wind,
	Bath,
	Tv2,
	Coffee,
	Users,
} from "lucide-react";

const hotelData = {
	name: "Azure Bay Resort",
	location: "Seminyak, Bali, Indonesia",
	address: "Jl. Kayu Aya No. 88, Seminyak, Kuta Utara, Badung Regency, Bali 80361",
	rating: 4.9,
	reviewsCount: 248,
	reviewLabel: "Excellent",
	price: 320,
	tax: 42,
	discounts: 18,
	heroImage:
		"https://images.unsplash.com/photo-1501117716987-c8e1ecb2103e?q=80&w=1600&auto=format&fit=crop",
	description:
		"A beachfront resort with calm, contemporary interiors, ocean-facing suites, a relaxing wellness program, and a polished dining scene designed for easy luxury stays.",
	shortHighlights: [
		"Ocean-view suites",
		"Infinity pool",
		"Breakfast included",
		"Free airport shuttle",
	],
	gallery: [
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
		"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
	],
	facts: [
		{ label: "Hotel Category", value: "5-Star Luxury Beach Resort", icon: Sparkles },
		{ label: "Check-in / Check-out", value: "3:00 PM / 12:00 PM", icon: Clock3 },
		{ label: "Nearby Attractions", value: "Seminyak Beach, Potato Head, Tanah Lot", icon: Compass },
		{ label: "Address", value: "Jl. Kayu Aya No. 88, Seminyak, Bali", icon: MapPin },
	],
	amenities: [
		{ icon: Wifi, label: "Free WiFi" },
		{ icon: Waves, label: "Swimming Pool" },
		{ icon: Sparkles, label: "Spa & Wellness" },
		{ icon: UtensilsCrossed, label: "Restaurant" },
		{ icon: ParkingCircle, label: "Free Parking" },
		{ icon: Wind, label: "Airport Shuttle" },
		{ icon: BedDouble, label: "Family Suites" },
		{ icon: Bath, label: "Private Bath" },
		{ icon: Tv2, label: "Smart TV" },
		{ icon: Coffee, label: "Breakfast Buffet" },
		{ icon: TentTree, label: "Beach Cabana" },
		{ icon: PhoneCall, label: "24/7 Support" },
	],
	rooms: [
		{
			name: "Deluxe Ocean King",
			size: "42 sqm",
			beds: "1 king bed",
			guests: "2 adults",
			price: "$320/night",
		},
		{
			name: "Garden Family Suite",
			size: "58 sqm",
			beds: "2 queen beds",
			guests: "4 adults",
			price: "$410/night",
		},
		{
			name: "Presidential Villa",
			size: "120 sqm",
			beds: "1 king bed + private pool",
			guests: "4 adults",
			price: "$780/night",
		},
	],
	reviews: [
		{
			name: "Sarah Johnson",
			date: "March 15, 2026",
			avatar:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
			rating: 5,
			comment:
				"The infinity pool overlooking the ocean was unforgettable. Staff were attentive, the room was spotless, and the breakfast spread was excellent.",
		},
		{
			name: "Michael Chen",
			date: "March 10, 2026",
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
			rating: 5,
			comment:
				"Beautiful beachfront location with a very calm atmosphere. The concierge helped us plan dinner and transfers without any friction.",
		},
		{
			name: "Emma Williams",
			date: "March 3, 2026",
			avatar:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
			rating: 4,
			comment:
				"Great value for the area. The room was comfortable and the beach access was the biggest highlight for our stay.",
		},
	],
	similarHotels: [
		{
			name: "Sunset Paradise Villa",
			rating: 4.7,
			price: "$280",
			image:
				"https://images.unsplash.com/photo-1502920917128-1aa500764ce7?q=80&w=1200&auto=format&fit=crop",
		},
		{
			name: "Ocean Breeze Resort",
			rating: 4.9,
			price: "$350",
			image:
				"https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200&auto=format&fit=crop",
		},
		{
			name: "Palm Garden Hotel",
			rating: 4.6,
			price: "$245",
			image:
				"https://images.unsplash.com/photo-1519821172141-b5d8ee4e420d?q=80&w=1200&auto=format&fit=crop",
		},
		{
			name: "Tropical Haven Spa",
			rating: 4.8,
			price: "$310",
			image:
				"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
		},
	],
};

function formatPrice(value) {
	return new Intl.NumberFormat("en-US").format(value);
}

function StarRow({ rating }) {
	return (
		<div className="flex items-center gap-1 text-amber-400">
			{Array.from({ length: 5 }).map((_, index) => (
				<Star
					key={index}
					className={index < rating ? "h-4 w-4 fill-current" : "h-4 w-4 text-slate-200"}
				/>
			))}
		</div>
	);
}

export default function HotelDetailsPage() {
	const [selectedImage, setSelectedImage] = useState(0);

	const selectedGalleryImage = useMemo(
		() => hotelData.gallery[selectedImage] || hotelData.heroImage,
		[selectedImage]
	);

	const bookingTotal = hotelData.price + hotelData.tax - hotelData.discounts;

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
						<div className="relative min-h-[340px] lg:min-h-[520px]">
							<img
								src={selectedGalleryImage}
								alt={hotelData.name}
								className="h-full w-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

							<div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur">
								<ArrowLeft className="h-4 w-4" />
								Back to hotels
							</div>

							<div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
								<div className="flex flex-wrap gap-2">
									{hotelData.shortHighlights.map((item) => (
										<span
											key={item}
											className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur"
										>
											{item}
										</span>
									))}
								</div>

								<h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
									{hotelData.name}
								</h1>

								<div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/90">
									<span className="inline-flex items-center gap-2">
										<MapPin className="h-4 w-4" />
										{hotelData.location}
									</span>
									<span className="inline-flex items-center gap-2">
										<Users className="h-4 w-4" />
										Couples, families, and premium travelers
									</span>
								</div>
							</div>
						</div>

						<aside className="flex flex-col justify-between gap-6 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-8">
							<div>
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="text-sm font-medium text-sky-600">Starting from</p>
										<div className="mt-2 flex items-end gap-2">
											<span className="text-4xl font-semibold tracking-tight text-slate-900">
												${formatPrice(hotelData.price)}
											</span>
											<span className="pb-1 text-sm text-slate-500">/night</span>
										</div>
									</div>

									<button className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:border-rose-200 hover:text-rose-500">
										<Heart className="h-5 w-5" />
									</button>
								</div>

								<div className="mt-5 flex items-center gap-3">
									<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-200">
										<Star className="h-7 w-7 fill-current" />
									</div>
									<div>
										<div className="flex items-center gap-2">
											<span className="text-2xl font-semibold">{hotelData.rating}</span>
											<span className="text-sm text-slate-500">/{hotelData.reviewLabel}</span>
										</div>
										<p className="text-sm text-slate-500">Based on {hotelData.reviewsCount} guest reviews</p>
										<StarRow rating={5} />
									</div>
								</div>

								<p className="mt-5 text-sm leading-6 text-slate-600">
									{hotelData.description}
								</p>

								<div className="mt-6 grid gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
									<div className="flex items-center justify-between text-sm text-slate-500">
										<span>Price</span>
										<span>${formatPrice(hotelData.price)}</span>
									</div>
									<div className="flex items-center justify-between text-sm text-slate-500">
										<span>Taxes & fees</span>
										<span>${formatPrice(hotelData.tax)}</span>
									</div>
									<div className="flex items-center justify-between text-sm text-slate-500">
										<span>Discount</span>
										<span className="text-emerald-600">-${formatPrice(hotelData.discounts)}</span>
									</div>
									<div className="my-1 h-px bg-slate-200" />
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-slate-600">Total estimate</span>
										<span className="text-2xl font-semibold text-slate-900">${formatPrice(bookingTotal)}</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700">
									View rooms
								</button>
								<button className="rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600">
									Book now
								</button>
							</div>
						</aside>
					</div>
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Gallery</p>
								<h2 className="mt-2 text-2xl font-semibold text-slate-900">Explore the property</h2>
							</div>
							<div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 sm:flex">
								<CameraBadge />
								12 Photos
							</div>
						</div>

						<div className="mt-5 grid gap-4 lg:grid-cols-5">
							<button
								type="button"
								onClick={() => setSelectedImage(0)}
								className="group relative overflow-hidden rounded-3xl lg:col-span-3"
							>
								<img
									src={hotelData.gallery[0]}
									alt="Hotel gallery 1"
									className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[320px]"
								/>
							</button>

							<div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-rows-2">
								{hotelData.gallery.slice(1).map((image, index) => (
									<button
										key={image}
										type="button"
										onClick={() => setSelectedImage(index + 1)}
										className="group overflow-hidden rounded-3xl"
									>
										<img
											src={image}
											alt={`Hotel gallery ${index + 2}`}
											className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
										/>
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Quick Facts</p>
						<h2 className="mt-2 text-2xl font-semibold text-slate-900">Everything in one place</h2>

						<div className="mt-5 grid gap-4 sm:grid-cols-2">
							{hotelData.facts.map(({ label, value, icon: Icon }) => (
								<div
									key={label}
									className="rounded-3xl border border-sky-100 bg-sky-50/70 p-4"
								>
									<div className="flex items-start gap-3">
										<div className="rounded-2xl bg-white p-3 text-sky-500 shadow-sm ring-1 ring-sky-100">
											<Icon className="h-5 w-5" />
										</div>
										<div>
											<p className="text-sm font-medium text-slate-500">{label}</p>
											<p className="mt-1 text-sm font-semibold leading-6 text-slate-900">{value}</p>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
							<div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
								<CheckCircle2 className="h-4 w-4 text-emerald-500" />
								Flexible booking and secure payment
							</div>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Mock data only. This page is designed to plug into your real hotel listing later with the same layout and interaction pattern.
							</p>
						</div>
					</div>
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Hotel Details</p>
						<h2 className="mt-2 text-2xl font-semibold text-slate-900">About this property</h2>

						<p className="mt-4 text-sm leading-7 text-slate-600">
							Azure Bay Resort is built for travelers who want a polished beachfront stay without losing the calm of a private retreat. The design uses warm timber, clean lines, and open-air spaces to frame the sea, while the service style focuses on speed, comfort, and thoughtful detail.
						</p>

						<div className="mt-6 grid gap-4 md:grid-cols-2">
							{hotelData.rooms.map((room) => (
								<div key={room.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
									<div className="flex items-start justify-between gap-3">
										<div>
											<h3 className="text-lg font-semibold text-slate-900">{room.name}</h3>
											<p className="mt-1 text-sm text-slate-500">{room.size}</p>
										</div>
										<span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-600 ring-1 ring-sky-100">
											{room.price}
										</span>
									</div>

									<div className="mt-4 space-y-3 text-sm text-slate-600">
										<div className="flex items-center justify-between gap-4">
											<span className="inline-flex items-center gap-2">
												<BedDouble className="h-4 w-4 text-sky-500" />
												Beds
											</span>
											<span>{room.beds}</span>
										</div>
										<div className="flex items-center justify-between gap-4">
											<span className="inline-flex items-center gap-2">
												<Users className="h-4 w-4 text-sky-500" />
												Guests
											</span>
											<span>{room.guests}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Guest Reviews</p>
								<h2 className="mt-2 text-2xl font-semibold text-slate-900">Loved by guests</h2>
							</div>
							<div className="text-right">
								<p className="text-4xl font-semibold text-slate-900">{hotelData.rating}</p>
								<StarRow rating={5} />
							</div>
						</div>

						<div className="mt-6 space-y-4">
							{hotelData.reviews.map((review) => (
								<article key={review.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
									<div className="flex items-start gap-3">
										<img
											src={review.avatar}
											alt={review.name}
											className="h-12 w-12 rounded-2xl object-cover"
										/>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center justify-between gap-2">
												<div>
													<h3 className="font-semibold text-slate-900">{review.name}</h3>
													<p className="text-xs text-slate-500">{review.date}</p>
												</div>
												<StarRow rating={review.rating} />
											</div>
											<p className="mt-3 text-sm leading-6 text-slate-600">{review.comment}</p>
										</div>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Facilities & Amenities</p>
							<h2 className="mt-2 text-2xl font-semibold text-slate-900">Designed for an easy stay</h2>
						</div>
						<p className="hidden text-sm text-slate-500 sm:block">Selected for comfort, convenience, and leisure</p>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
						{hotelData.amenities.map(({ icon: Icon, label }) => (
							<div
								key={label}
								className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
							>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-500 ring-1 ring-sky-100">
									<Icon className="h-5 w-5" />
								</div>
								<p className="mt-3 text-sm font-medium text-slate-700">{label}</p>
							</div>
						))}
					</div>
				</section>

				<section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Similar Hotels</p>
							<h2 className="mt-2 text-2xl font-semibold text-slate-900">More stays you may like</h2>
						</div>
						<div className="flex items-center gap-2 text-slate-400">
							<button className="rounded-full border border-slate-200 bg-white p-2 transition hover:text-sky-500">
								<ChevronRight className="h-4 w-4 rotate-180" />
							</button>
							<button className="rounded-full border border-slate-200 bg-white p-2 transition hover:text-sky-500">
								<ChevronRight className="h-4 w-4" />
							</button>
						</div>
					</div>

					<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{hotelData.similarHotels.map((hotel) => (
							<article key={hotel.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
								<img src={hotel.image} alt={hotel.name} className="h-44 w-full object-cover" />
								<div className="p-4">
									<h3 className="text-lg font-semibold text-slate-900">{hotel.name}</h3>
									<div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
										<Star className="h-4 w-4 fill-current" />
										<span className="font-medium text-slate-700">{hotel.rating}</span>
									</div>
									<div className="mt-4 flex items-end justify-between gap-3">
										<p className="text-xl font-semibold text-slate-900">
											{hotel.price}<span className="text-sm font-normal text-slate-500">/night</span>
										</p>
										<button className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
											View details
										</button>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

function CameraBadge() {
	return (
		<div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
			<CheckCircle2 className="h-4 w-4" />
		</div>
	);
}
