import { useState } from "react";
import {
	Bath,
	BedDouble,
	Camera,
	Clock3,
	Compass,
	MapPin,
	ParkingCircle,
	PhoneCall,
	Sparkles,
	Star,
	TentTree,
	Tv2,
	UtensilsCrossed,
	Waves,
	Wifi,
	Wind,
	Coffee,
} from "lucide-react";
import heroBackground from "../assets/images/hero_background.png";
import maldivesOverwater from "../assets/images/maldives_overwater.png";
import oiaCliffside from "../assets/images/oia_cliffside.png";
import villingiliIsland from "../assets/images/villingili_island.png";
import amazonEcoResort from "../assets/images/amazon_eco_resort.png";

const hotelData = {
	name: "Azure Bay Resort",
	location: "Seminyak, Bali, Indonesia",
	address: "Jl. Kayu Aya No. 88, Seminyak, Kuta Utara, Badung Regency, Bali 80361",
	rating: 5.0,
	reviewsCount: 248,
	reviewLabel: "Excellent",
	price: 320,
	tax: 42,
	discounts: 18,
	heroImage: maldivesOverwater,
	description:
		"Experience luxury at its finest in our beachfront resort. Azure Bay offers stunning ocean views, world-class amenities, and exceptional service. Indulge in our infinity pool, rejuvenate at our spa, and savor exquisite cuisine at our award-winning restaurants.",
	gallery: [
		maldivesOverwater,
		heroBackground,
		villingiliIsland,
		oiaCliffside,
		amazonEcoResort,
	],
	facts: [
		{ label: "Hotel Category", value: "5-Star Luxury Beach Resort", icon: Sparkles },
		{ label: "Check-in / Check-out", value: "3:00 PM / 12:00 PM", icon: Clock3 },
		{ label: "Nearby Attractions", value: "Seminyak Beach (5 min walk), Potato Head Beach Club (10 min), Tanah Lot Temple (30 min)", icon: Compass },
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
	reviews: [
		{
			name: "Sarah Johnson",
			date: "March 15, 2024",
			initials: "SJ",
			rating: 5,
			comment:
				"Absolutely stunning resort! The infinity pool overlooking the ocean was breathtaking. Staff went above and beyond to make our honeymoon special. The spa treatments were divine and the food at the beachfront restaurant was exceptional.",
		},
		{
			name: "Michael Chen",
			date: "March 10, 2024",
			initials: "MC",
			rating: 5,
			comment:
				"Best hotel experience in Bali! The room was spacious and beautifully designed. Loved the private balcony with ocean views. The concierge helped us plan amazing day trips. Will definitely return!",
		},
		{
			name: "Emma Williams",
			date: "March 5, 2024",
			initials: "EW",
			rating: 4,
			comment:
				"Wonderful stay at Azure Bay. The location is perfect - close to Seminyak beach and great restaurants. The breakfast buffet had amazing variety. Only minor issue was WiFi speed in some areas, but overall highly recommend.",
		},
		{
			name: "David Martinez",
			date: "February 28, 2024",
			initials: "DM",
			rating: 5,
			comment:
				"Luxury at its finest! From check-in to check-out, everything was perfect. The sunset views from our villa were unforgettable. The staff remembered our names and preferences. Worth every penny!",
		},
	],
	reviewMetrics: [
		{ label: "Overall", value: 4.8 },
	],
};

function formatPrice(value) {
	return new Intl.NumberFormat("en-US").format(value);
}

function StarRow({ rating, size = "h-4 w-4" }) {
	return (
		<div className="flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, index) => {
				const fill = Math.min(1, Math.max(0, rating - index));
				return (
					<div key={index} className={`relative ${size}`}>
						<Star className={`${size} text-slate-200`} />
						<div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
							<Star className={`${size} fill-current text-sky-500`} />
						</div>
					</div>
				);
			})}
		</div>
	);
}

function SectionTitle({ eyebrow, title, description, action }) {
	return (
		<div className="flex items-start justify-between gap-4">
			<div>
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">{eyebrow}</p>
				<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">{title}</h2>
				{description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p> : null}
			</div>
			{action}
		</div>
	);
}

function MetricBar({ label, value }) {
	return (
		<div className="grid grid-cols-[96px_1fr_34px] items-center gap-2 text-sm">
			<span className="text-slate-500">{label}</span>
			<div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
				<div className="h-full rounded-full bg-sky-500" style={{ width: `${(value / 5) * 100}%` }} />
			</div>
			<span className="text-right font-medium text-slate-600">{value.toFixed(1)}</span>
		</div>
	);
}

export default function HotelDetailsPage() {
	const [selectedImage, setSelectedImage] = useState(0);
	const selectedGalleryImage = hotelData.gallery[selectedImage] || hotelData.heroImage;
	const visibleAmenities = hotelData.amenities.slice(0, 9);

	return (
		<div className="min-h-screen bg-[#f4f7fb] text-slate-900">
			<main className="mx-auto max-w-[1220px] px-4 py-4 sm:px-6 lg:px-8">
				<section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="h-[280px] overflow-hidden sm:h-[320px]">
						<img src={selectedGalleryImage} alt={hotelData.name} className="h-full w-full object-cover" />
					</div>

					<div className="p-5 sm:p-7 lg:p-8">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
							<div className="max-w-3xl">
								<h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2.15rem]">{hotelData.name}</h1>
								<div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
									<span className="inline-flex items-center gap-1.5">
										<MapPin className="h-4 w-4 text-sky-500" />
										{hotelData.location}
									</span>
									<span className="inline-flex items-center gap-1.5">
										<Star className="h-4 w-4 fill-current text-sky-500" />
										{hotelData.rating.toFixed(1)}
									</span>
									<span className="text-slate-300">|</span>
									<span>{hotelData.reviewsCount} reviews</span>
								</div>
								<StarRow rating={hotelData.rating} />
								<p className="mt-4 max-w-4xl text-sm leading-7 text-slate-500 sm:text-[15px]">
									{hotelData.description}
								</p>
							</div>

							<div className="flex flex-col items-start gap-4 lg:items-end">
								<div>
									<p className="text-xs font-medium text-slate-500">Starting from</p>
									<p className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">${formatPrice(hotelData.price)}</p>
								</div>
								<button className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(14,165,233,0.28)] transition hover:bg-sky-600">
									Book Now
								</button>
							</div>
						</div>
					</div>
				</section>

				<section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
					<SectionTitle
						eyebrow="Gallery"
						title="Explore the property"
						description="A closer look at the rooms, pool, and beachfront atmosphere."
						action={
							<div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 sm:flex">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
									<Camera className="h-4 w-4" />
								</div>
								12 Photos
							</div>
						}
					/>

					<div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
						<img src={selectedGalleryImage} alt={`${hotelData.name} gallery`} className="h-[340px] w-full object-cover sm:h-[400px] lg:h-[460px]" />
					</div>

					<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
						{hotelData.gallery.map((image, index) => (
							<button
								key={image}
								type="button"
								onClick={() => setSelectedImage(index)}
								className={`overflow-hidden rounded-[22px] border transition duration-300 ${
									selectedImage === index ? "border-sky-400 shadow-[0_12px_28px_rgba(14,165,233,0.22)] ring-2 ring-sky-100" : "border-transparent shadow-[0_8px_18px_rgba(15,23,42,0.08)] hover:-translate-y-0.5"
								}`}
							>
								<img src={image} alt={`Gallery thumbnail ${index + 1}`} className="h-[92px] w-full object-cover sm:h-[106px] lg:h-[124px]" />
							</button>
						))}
					</div>
				</section>

				<section className="mt-6 space-y-6">
					<div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
						<SectionTitle
							eyebrow="Hotel Details"
							title="About this property"
							description="Comfort, service, and location combine into a simple upscale stay."
						/>

						<p className="mt-4 text-sm leading-7 text-slate-600">
							Azure Bay Resort is a spacious beachfront sanctuary nestled in the heart of Seminyak, Bali. Our resort combines contemporary Balinese architecture with modern luxury, offering guests an unforgettable tropical escape. Each of our elegantly appointed rooms and suites features private balconies with stunning ocean or garden views. Guests can indulge in our world-class spa, take a dip in our infinity pool overlooking the Indian Ocean, or savor authentic Indonesian and international cuisine at our three signature restaurants. Whether you're seeking relaxation or adventure, our dedicated concierge team is ready to curate the perfect Bali experience for you.
						</p>

						<div className="mt-6 grid gap-4 md:grid-cols-2">
							{hotelData.facts.map(({ label, value, icon: Icon }) => (
								<div key={label} className="rounded-2xl border border-sky-200 bg-sky-50/50 p-4">
									<div className="flex items-start gap-3">
										<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-500 shadow-sm ring-1 ring-sky-100">
											<Icon className="h-5 w-5" />
										</div>
										<div>
											<p className="text-sm font-semibold text-slate-700">{label}</p>
											<p className="mt-1 text-sm leading-6 text-slate-500">{value}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
						<SectionTitle eyebrow="Guest Reviews" title="Loved by guests" />

						<div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
							<div className="flex flex-col items-center text-center">
								<p className="text-5xl font-semibold tracking-tight text-slate-900">4.8</p>
								<div className="mt-2">
									<StarRow rating={4.8} size="h-5 w-5" />
								</div>
								<p className="mt-1.5 text-sm text-slate-500">Based on {hotelData.reviewsCount} reviews</p>
							</div>

							<div className="hidden h-16 w-px bg-slate-200 sm:block" />

							<div className="w-full max-w-md flex-1">
								{hotelData.reviewMetrics.map((metric) => (
									<MetricBar key={metric.label} label={metric.label} value={metric.value} />
								))}
							</div>
						</div>

						<div className="mt-6 space-y-4">
							{hotelData.reviews.map((review) => (
								<article key={review.name} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
									<div className="flex items-start gap-3">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-600">
											{review.initials}
										</div>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center justify-between gap-2">
												<div>
													<h3 className="text-sm font-semibold text-slate-900">{review.name}</h3>
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

				<section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
					<SectionTitle
						eyebrow="Facilities & Amenities"
						title="Designed for an easy stay"
						description="Selected for comfort, convenience, and leisure."
					/>

					<div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
						{visibleAmenities.map(({ icon: Icon, label }) => (
							<div key={label} className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-500">
									<Icon className="h-5 w-5" />
								</div>
								<p className="mt-3 text-sm font-medium text-slate-700">{label}</p>
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
