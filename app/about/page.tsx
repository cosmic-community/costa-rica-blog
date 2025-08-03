import { cosmic } from '@/lib/cosmic'
import type { CosmicObject } from '@/types'

interface AboutPage extends CosmicObject {
  type: 'about-pages';
  metadata: {
    subtitle?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    mission?: string;
    vision?: string;
    team_members?: string;
  };
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: {
    imgix_url: string;
  };
}

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'about-pages',
        slug: 'about'
      });
    
    return response.object as AboutPage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching about page:', error);
    throw new Error('Failed to fetch about page');
  }
}

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">About page not found</h1>
          <p className="text-gray-600">The about page content could not be loaded.</p>
        </div>
      </div>
    );
  }

  // Parse team members JSON
  let teamMembers: TeamMember[] = [];
  if (aboutPage.metadata.team_members) {
    try {
      teamMembers = JSON.parse(aboutPage.metadata.team_members);
    } catch (error) {
      console.error('Error parsing team members:', error);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        {aboutPage.metadata.featured_image && (
          <div className="absolute inset-0">
            <img
              src={`${aboutPage.metadata.featured_image.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
              alt="About us"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {aboutPage.title}
          </h1>
          {aboutPage.metadata.subtitle && (
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
              {aboutPage.metadata.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {aboutPage.metadata.content && (
          <div 
            className="prose prose-lg prose-blue max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: aboutPage.metadata.content }}
          />
        )}

        {/* Mission and Vision */}
        {(aboutPage.metadata.mission || aboutPage.metadata.vision) && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {aboutPage.metadata.mission && (
              <div className="bg-blue-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Our Mission
                </h2>
                <p className="text-blue-800 leading-relaxed">
                  {aboutPage.metadata.mission}
                </p>
              </div>
            )}

            {aboutPage.metadata.vision && (
              <div className="bg-teal-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-teal-900 mb-4 flex items-center">
                  <span className="text-3xl mr-3">🔭</span>
                  Our Vision
                </h2>
                <p className="text-teal-800 leading-relaxed">
                  {aboutPage.metadata.vision}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Team Members */}
        {teamMembers.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`${member.photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Explore Costa Rica?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us on this incredible journey as we share the best of Costa Rica's surf, culture, and natural wonders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/posts"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-block"
            >
              Read Our Stories
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 inline-block"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}