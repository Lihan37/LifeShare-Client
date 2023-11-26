

const FeaturedSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Content</h2>
        <p className="text-gray-600 mb-8">
          Explore some of our featured content and stay updated with the latest in blood donation.
        </p>

        {/* Example Featured Cards */}
        <div className="grid px-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Card 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Card Content */}
            <h3 className="text-xl font-bold mb-2">Understanding Blood Types</h3>
            <p className="text-gray-700 mb-4">
              Learn about different blood types and their significance in the donation process.
            </p>
            <a href="/blog/understanding-blood-types" className="text-blue-500 hover:underline">Read More</a>
          </div>

          {/* Featured Card 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Card Content */}
            <h3 className="text-xl font-bold mb-2">Donor Spotlight: Stories of Impact</h3>
            <p className="text-gray-700 mb-4">
              Hear inspiring stories from donors whose contributions have made a difference.
            </p>
            <a href="/blog/donor-spotlight" className="text-blue-500 hover:underline">Read More</a>
          </div>

          {/* Featured Card 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Card Content */}
            <h3 className="text-xl font-bold mb-2">Blood Donation Events Near You</h3>
            <p className="text-gray-700 mb-4">
              Find upcoming blood donation events in your area and participate in saving lives.
            </p>
            <a href="/events" className="text-blue-500 hover:underline">View Events</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
