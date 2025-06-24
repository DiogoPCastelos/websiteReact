import {
  useState,
  useRef,
  lazy,
  Suspense,
  useCallback,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { initializeApp } from "firebase/app";

// Lazy Load Components
const About = lazy(() => import("../components/About"));
const Projects = lazy(() => import("../components/Projects"));
const Contact = lazy(() => import("../components/Contact"));

// Firebase config (replace with your values)
const firebaseConfig = {
  apiKey: "AIzaSyDN1QLdt2nfT8EiTeFwmOJbBWQGmGSFWhw",
  authDomain: "websitereact-cd7e9.firebaseapp.com",
  projectId: "websitereact-cd7e9",
  storageBucket: "websitereact-cd7e9.firebasestorage.app",
  messagingSenderId: "629387179127",
  appId: "1:629387179127:web:678483370ad04faa688272",
  measurementId: "G-7XD00JQPCT",
};

let app = null;
let analyticsInitialized = false;
let firebaseEnabled = true;

// Initialize Firebase app with error handling
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Failed to initialize Firebase app:", error);
  firebaseEnabled = false;
}

function HomePage() {
  const baseURL = import.meta.env.BASE_URL;
  const [aboutVisible, setAboutVisible] = useState(true);
  const [rotation, setRotation] = useState(360);
  const [aboutHeight, setAboutHeight] = useState("100vh");
  const [showConsent, setShowConsent] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const canvasRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const consent = localStorage.getItem("analytics-consent");
    if (consent === null) {
      setShowConsent(true);
    } else if (consent === "true") {
      initAnalytics();
    } else if (consent === "false") {
      if (window.indexedDB && window.indexedDB.deleteDatabase) {
        const fbDatabases = [
          "firebaseLocalStorageDb",
          "firebase-installations-database",
          "firebase-heartbeat-database",
        ];
        fbDatabases.forEach((dbName) => {
          window.indexedDB.deleteDatabase(dbName);
        });
      }

      // Delete specific Firebase-related cookies (e.g., those starting with "firebase")
      document.cookie.split(";").forEach((cookie) => {
        const cookieName = cookie.trim().split("=")[0];
        if (cookieName.toLowerCase().startsWith("firebase")) {
          document.cookie =
            cookieName + `=;expires=${new Date(0).toUTCString()};path=/`;
        }
      });

      // Delete all cookies as an extra cleanup step
      document.cookie.split(";").forEach((c) => {
        const cookieName = c.trim().split("=")[0];
        document.cookie =
          cookieName + `=;expires=${new Date(0).toUTCString()};path=/`;
      });

      // Optional: clear session storage if needed
      sessionStorage.clear();
    }
  }, []);

  const handleConsent = (accepted) => {
    setShowConsent(false);
    localStorage.setItem("analytics-consent", accepted ? "true" : "false");

    if (accepted) {
      initAnalytics().then(() => {
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 1000);
      });
      return;
    }

    // Delete Firebase-related IndexedDB databases
    if (window.indexedDB && window.indexedDB.deleteDatabase) {
      const fbDatabases = [
        "firebaseLocalStorageDb",
        "firebase-installations-database",
        "firebase-heartbeat-database",
      ];
      fbDatabases.forEach((dbName) => {
        window.indexedDB.deleteDatabase(dbName);
      });
    }

    // Delete specific Firebase-related cookies (e.g., those starting with "firebase")
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.trim().split("=")[0];
      if (cookieName.toLowerCase().startsWith("firebase")) {
        document.cookie =
          cookieName + `=;expires=${new Date(0).toUTCString()};path=/`;
      }
    });

    // Delete all cookies as an extra cleanup step
    document.cookie.split(";").forEach((c) => {
      const cookieName = c.trim().split("=")[0];
      document.cookie =
        cookieName + `=;expires=${new Date(0).toUTCString()};path=/`;
    });

    // Optional: clear session storage if needed
    sessionStorage.clear();

    window.location.href = window.location.href;
  };

  const initAnalytics = async () => {
    if (analyticsInitialized || !firebaseEnabled || !app) return;

    try {
      analyticsInitialized = true;

      // Initialize Analytics with error handling
      const { getAnalytics, isSupported } = await import("firebase/analytics");

      // Check if Analytics is supported
      const supported = await isSupported();
      if (!supported) {
        console.log("Firebase Analytics not supported in this environment");
        return;
      }

      // Initialize analytics with minimal configuration
      const analytics = getAnalytics(app);
      console.log("✅ Firebase Analytics initialized successfully");
    } catch (error) {
      console.error("❌ Firebase Analytics initialization failed:", error);
      firebaseEnabled = false;
      // Silently fail to prevent app crashes
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAboutHeight("unset");
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const toggleAboutSection = () => {
    setAboutVisible((prev) => {
      setAboutHeight(prev ? 0 : "auto");
      if (!prev) {
        scrollToSection(aboutRef, (12 * window.innerHeight) / 100);
      }
      setRotation(prev ? 0 : 360);

      const newState = !prev;
      if (newState) {
        setTimeout(
          () => scrollToSection(aboutRef, (12 * window.innerHeight) / 100),
          300
        );
      }
      return newState;
    });
  };

  const scrollToSection = useCallback((ref, offset = 0) => {
    if (ref.current) {
      const y =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const timeout = setTimeout(() => {
      let stars = [];

      const width = window.innerWidth;
      const totalHeight = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(totalHeight * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = totalHeight + "px";

      ctx.scale(dpr, dpr);

      const getRandomColor = () => {
        const colors = [
          "rgba(173, 216, 230, 1)",
          "rgba(129, 148, 132, 1)",
          "rgba(255, 255, 224, 1)",
          "rgba(252, 227, 151, 1)",
          "rgba(255, 250, 250, 1)",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      };

      const count = width > 1000 ? 5000 : width > 800 ? 2000 : 750;
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * totalHeight,
        size: Math.random() * 2.5 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.001 + 0.002,
        color: getRandomColor(),
      }));

      const drawStars = () => {
        ctx.clearRect(0, 0, width, totalHeight);

        ctx.save();
        ctx.translate(width / 2, totalHeight / 2);
        ctx.translate(-width / 2, -totalHeight / 2);

        const scrollY = window.scrollY;
        stars.forEach((star) => {
          const yOffset = star.y - scrollY * 0.2;
          const twinkle = Math.sin(Date.now() * star.twinkleSpeed) * 0.5 + 0.5;
          ctx.fillStyle = star.color.replace(
            "1)",
            `${star.brightness * twinkle})`
          );
          ctx.beginPath();
          ctx.arc(
            star.x,
            (yOffset + totalHeight) % totalHeight,
            star.size * (twinkle + 0.5),
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        ctx.restore();
        requestAnimationFrame(drawStars);
      };

      drawStars();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden text-textPrimary flex flex-col">
      {/* Privacy Policy Popup */}
      <AnimatePresence>
        {showPrivacyPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1100] p-4"
            onClick={() => setShowPrivacyPolicy(false)}
          >
            <motion.div className="relative w-fit h-fit">
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-neutral-900 text-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-6 "
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="absolute right-7 text-gray-400 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </motion.button>

                <div className="pr-8">
                  <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                  <p className="text-sm text-gray-400 mb-6">
                    <strong>Last updated: June 24, 2025</strong>
                  </p>

                  <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Overview</h2>
                    <p className="text-gray-300 leading-relaxed">
                      This website (www.diogopcastelos.pt) uses Google Analytics
                      to understand how visitors use the site. All data
                      collected is anonymous and used only for my own personal
                      intertainment to see how many visits my website gets. No
                      personal information is collected or stored.
                    </p>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                      What We Collect
                    </h2>
                    <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                      <li>Pages visited</li>
                      <li>Time spent on each page</li>
                      <li>Device and browser type</li>
                      <li>General location (country/region)</li>
                      <li>How you arrived at the site</li>
                    </ul>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Your Consent</h2>
                    <p className="text-gray-300 leading-relaxed">
                      When you first visit the site, you can choose whether to
                      allow analytics tracking. Your choice is stored in your
                      browser (using localStorage) so we remember it next time.
                      After some time it will be deleted as your browser forgets
                      it. The choice stored is mearly a "allow" or "disallow",
                      not a tracker of any kind. It is not unique to you nor can
                      we identify any user nor user information with it.
                    </p>

                    <p className="text-gray-300 leading-relaxed mt-4">
                      You can revoke your consent at all times by pressing the
                      "Cookies" header at the footer of the page.
                    </p>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Data Sharing</h2>
                    <p className="text-gray-300 leading-relaxed">
                      We do <strong>not</strong> sell or share personal data.
                      Analytics data is processed by Google Analytics according
                      to their{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        privacy policy
                      </a>
                      .
                    </p>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Your Choices</h2>
                    <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                      <li>
                        You can block cookies or clear site data via your
                        browser
                      </li>
                      <li>
                        You can opt-out of all cookies by pressing decline, we
                        don't require cookies to function 😎
                      </li>
                      <li>
                        You can <strong>revoke permission</strong> by pressing
                        the "Cookies" header in the footer and declining.
                      </li>
                    </ul>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Contact</h2>
                    <div className="text-gray-300 ml-4">
                      <p>
                        <strong>Diogo Piteira Castelos</strong>
                      </p>
                      <p>Website: www.diogopcastelos.pt</p>
                      <p>
                        GitHub:{" "}
                        <a
                          href="https://github.com/DiogoPCastelos"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          https://github.com/DiogoPCastelos
                        </a>
                      </p>
                    </div>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Special Note</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Thank you to the EU for making this a requirement, I
                      applaud the effort to protect user privacy. In an age
                      where tech is the new frontier, I believe in transparency
                      and the rights of users to know what data is collected and
                      how it is used. This policy reflects my commitment to
                      respecting your privacy while still enjoying the fun of
                      seeing how many people visit my site.
                    </p>
                  </section>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      {showConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-800 text-white p-4 z-[1000] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm">
              We use cookies exclusively for analytics purposes, I like to see
              how many visits my website gets 😄.
            </span>
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
              title="Privacy Policy"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleConsent(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => handleConsent(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      <div className="relative bg-black min-h-screen overflow-x-hidden text-textPrimary flex flex-col">
        {/* ⭐ Canvas Background (Behind Topbar) */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full blur-[3px] pointer-events-none z-[10]"
        />

        {/* Topbar (Now Above Starfield) */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-transparent flex justify-between items-center h-[12vh] px-8 backdrop-blur-xl bg-opacity-10">
          <motion.button
            animate={{ rotate: rotation }}
            transition={{ duration: 1, ease: "easeOut" }}
            onClick={toggleAboutSection}
          >
            <img
              src={`${baseURL}images/ava.webp`}
              alt="Logo"
              className="h-[8vh] rounded-full shadow-lg"
            />
          </motion.button>
          <div className="flex space-x-6 text-lg font-medium">
            <button
              onClick={() =>
                scrollToSection(projectsRef, (12 * window.innerHeight) / 100)
              }
              className="nav-button"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="nav-button"
            >
              Contact
            </button>
            <a
              href={`${baseURL}/docs/CV - Diogo Piteira Castelos.pdf`}
              download
              className="nav-button hover:text-green-500"
            >
              CV
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-col mx-0 justify-center overflow-hidden relative z-10">
          <AnimatePresence>
            {aboutVisible && (
              <motion.div
                ref={aboutRef}
                initial={{ opacity: 0, height: 0 }} // Start collapsed
                animate={{ opacity: 1, height: aboutHeight }} // 100vh -> auto
                exit={{ opacity: 0, height: 0 }} // Collapse smoothly
                transition={{ duration: 1, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <Suspense
                  fallback={
                    <div className="text-center text-gray-400">
                      Loading About...
                    </div>
                  }
                >
                  <About />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Section */}
          <motion.div
            animate={{ paddingTop: aboutVisible ? "12vh" : "16vh" }}
            transition={{ duration: 1.3 }}
            ref={projectsRef}
            className="w-full mx-0"
          >
            <Suspense
              fallback={
                <div className="text-gray-400">Loading Projects...</div>
              }
            >
              <Projects />
            </Suspense>
          </motion.div>

          {/* Contact Section */}
          <div
            ref={contactRef}
            className="max-w-screen-lg opacity-100 max-h-[100vh] mx-auto py-4"
          >
            <Suspense
              fallback={
                <div className="text-center text-gray-400">
                  Loading Contact...
                </div>
              }
            >
              <Contact />
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4">
          <div className="flex justify-center space-x-6 mb-2">
            <FontAwesomeIcon
              size="3x"
              color="white"
              icon={faLinkedin}
              onClick={() =>
                window.open("https://www.linkedin.com/in/diogopcastelos/")
              }
              className="cursor-pointer hover:text-secondary"
            />
            <FontAwesomeIcon
              size="3x"
              color="white"
              icon={faGithub}
              onClick={() => window.open("https://github.com/DiogoPCastelos/")}
              className="cursor-pointer hover:text-secondary"
            />
            <FontAwesomeIcon
              size="3x"
              color="white"
              icon={faInstagram}
              onClick={() =>
                window.open("https://www.instagram.com/diogopcastelos/")
              }
              className="cursor-pointer hover:text-secondary"
            />
          </div>

          {/* License Section */}
          <div className="flex pt-2 flex-row justify-center">
            <img
              style={{
                height: "22px",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
              }}
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
              alt="CC"
            />
            <img
              style={{
                height: "22px",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
              }}
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
              alt="BY"
            />
            <img
              style={{
                height: "22px",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
              }}
              src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
              alt="NC"
            />
            <img
              style={{
                height: "22px",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
              }}
              src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
              alt="SA"
            />
          </div>
          <div className="text-sm text-gray-500">
            <p>
              <a
                property="dct:title"
                rel="cc:attributionURL"
                href="https://github.com/DiogoPCastelos/websiteReact/tree/main"
                className="hover:text-secondary"
              >
                DiogoPCastelos/websiteReact
              </a>{" "}
              by{" "}
              <a
                rel="cc:attributionURL dct:creator"
                property="cc:attributionName"
                href="https://github.com/DiogoPCastelos"
                className="hover:text-secondary"
              >
                Diogo Piteira Castelos
              </a>{" "}
              is licensed under <a className="font-bold">CC BY-NC-SA 4.0</a>.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            Made with Vite <FontAwesomeIcon icon={faReact} /> + TailwindCSS
          </div>
          <div
            className="text-sm text-gray-400 cursor-pointer"
            onClick={() => setShowConsent(true)}
          >
            Cookies
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
