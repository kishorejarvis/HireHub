import {
  employerFeatures,
  jobSeekerFeatures,
} from "../../Utils/data";

const featureSections = [
  {
    title: "For Job Seekers",
    description: "Find better opportunities with smart tools built for your career growth.",
    features: jobSeekerFeatures,
    accent: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    border: "border-blue-100",
  },
  {
    title: "For Employers",
    description: "Connect with qualified candidates and manage hiring with confidence.",
    features: employerFeatures,
    accent: "from-indigo-600 to-blue-600",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
    border: "border-indigo-100",
  },
];

const Features = () => {
  return (
    <section className="bg-transparent py-14 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
            Powerful Job Portal Features
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Whether you're looking for your next opportunity or the perfect
            candidate, we have the tools and features to make it happen.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {featureSections.map((section) => (
            <div key={section.title}>
              <div className="mb-6">
                <div
                  className={`mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r ${section.accent}`}
                />

                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {section.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-gray-600">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {section.features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={index}
                      className={`rounded-xl border ${section.border} bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                    >
                      <div
                        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${section.iconBg}`}
                      >
                        <Icon className={`h-6 w-6 ${section.iconText}`} />
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h4>

                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
