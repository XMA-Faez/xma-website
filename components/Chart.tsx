import React, { useState, useEffect, useRef } from "react";
import { FaMagnet, FaCog, FaCircle } from "react-icons/fa";

const CreativeTestingChart = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef(null);
  const chartRef = useRef(null);

  const createConnectionLine = (from, to, gradientId) => {
    if (!svgRef.current || !chartRef.current) return null;

    const svg = svgRef.current;
    const containerRect = chartRef.current.getBoundingClientRect();
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
    const toX = toRect.left + toRect.width / 2 - containerRect.left;
    const toY = toRect.top + toRect.height / 2 - containerRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", fromX);
    line.setAttribute("y1", fromY);
    line.setAttribute("x2", toX);
    line.setAttribute("y2", toY);
    line.setAttribute("stroke", `url(#${gradientId})`);
    line.setAttribute("stroke-width", "2");
    line.classList.add("connection-line");

    svg.appendChild(line);
    return line;
  };

  const animateConnections = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const svg = svgRef.current;
    if (!svg) return;

    // Clear existing lines
    const existingLines = svg.querySelectorAll(".connection-line");
    existingLines.forEach((line) => line.remove());

    const hooks = document.querySelectorAll('[data-type="hook"]');
    const bodies = document.querySelectorAll('[data-type="body"]');
    const ctas = document.querySelectorAll('[data-type="cta"]');

    let delay = 0;

    // Animate hook to body connections
    hooks.forEach((hook, i) => {
      bodies.forEach((body, j) => {
        setTimeout(() => {
          const line = createConnectionLine(hook, body, "hookToBody");
          if (line) {
            setTimeout(() => line.classList.add("active"), 50);
          }
        }, delay);
        delay += 100;
      });
    });

    // Animate body to CTA connections
    setTimeout(() => {
      bodies.forEach((body, j) => {
        setTimeout(() => {
          const line = createConnectionLine(body, ctas[0], "bodyToCta");
          if (line) {
            setTimeout(() => line.classList.add("active"), 50);
          }
        }, j * 200);
      });
    }, delay + 500);

    setTimeout(() => {
      setIsAnimating(false);
    }, delay + 2000);
  };

  useEffect(() => {
    // Auto-animate on load
    const timer = setTimeout(() => animateConnections(), 1500);

    // Re-animate every 10 seconds
    const interval = setInterval(() => {
      if (!isAnimating) animateConnections();
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isAnimating]);

  const HookElement = ({ index }) => (
    <div className="hook-element" data-type="hook" data-index={index}>
      <FaMagnet className="element-icon" />
    </div>
  );

  const BodyElement = ({ index }) => (
    <div className="body-element" data-type="body" data-index={index}>
      <FaCog className="element-icon" />
    </div>
  );

  const CtaElement = ({ index }) => (
    <div className="cta-element" data-type="cta" data-index={index}>
      <FaCircle className="element-icon" />
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "30px",
          padding: "40px",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Title Section */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{
              fontSize: "3rem",
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Creative Testing Matrix
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "1.2rem",
            }}
          >
            Abstract visualization of mix & match strategy
          </p>
        </div>

        {/* Chart Area */}
        <div
          ref={chartRef}
          style={{
            position: "relative",
            height: "600px",
            margin: "50px 0",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Floating Particles */}
          <div
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#ff6b6b",
              borderRadius: "50%",
              top: "10%",
              left: "15%",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "12px",
              height: "12px",
              background: "#4ecdc4",
              borderRadius: "50%",
              top: "20%",
              right: "20%",
              animation: "float 8s ease-in-out infinite 2s",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              background: "#45b7d1",
              borderRadius: "50%",
              bottom: "15%",
              left: "25%",
              animation: "float 8s ease-in-out infinite 4s",
            }}
          />

          {/* Connection SVG */}
          <svg
            ref={svgRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <defs>
              <linearGradient id="hookToBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#4ecdc4" />
              </linearGradient>
              <linearGradient id="bodyToCta" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ecdc4" />
                <stop offset="100%" stopColor="#45b7d1" />
              </linearGradient>
            </defs>
          </svg>

          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              position: "relative",
              padding: "40px",
            }}
          >
            {/* Hooks Column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#ff6b6b",
                  background: "rgba(255, 107, 107, 0.1)",
                  border: "2px solid rgba(255, 107, 107, 0.3)",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  marginBottom: "20px",
                  padding: "10px 20px",
                  borderRadius: "20px",
                }}
              >
                10 HOOKS
              </div>
              {Array.from({ length: 10 }, (_, i) => (
                <HookElement key={i} index={i} />
              ))}
            </div>

            {/* Body Column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#4ecdc4",
                  background: "rgba(78, 205, 196, 0.1)",
                  border: "2px solid rgba(78, 205, 196, 0.3)",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  marginBottom: "20px",
                  padding: "10px 20px",
                  borderRadius: "20px",
                }}
              >
                3 BODY
              </div>
              {Array.from({ length: 3 }, (_, i) => (
                <BodyElement key={i} index={i} />
              ))}
            </div>

            {/* CTA Column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#45b7d1",
                  background: "rgba(69, 183, 209, 0.1)",
                  border: "2px solid rgba(69, 183, 209, 0.3)",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  marginBottom: "20px",
                  padding: "10px 20px",
                  borderRadius: "20px",
                }}
              >
                1 CTA
              </div>
              <CtaElement index={0} />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            className="stat-box"
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0 auto 15px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #ff6b6b, #ff8e8e)",
                color: "white",
              }}
            >
              🧲
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "5px",
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              10
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1rem",
              }}
            >
              Hook Variations
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            className="stat-box"
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0 auto 15px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #4ecdc4, #44a8a8)",
                color: "white",
              }}
            >
              ⚙️
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "5px",
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              3
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1rem",
              }}
            >
              Body Options
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            className="stat-box"
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0 auto 15px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #45b7d1, #2980b9)",
                color: "white",
              }}
            >
              🔘
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "5px",
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              1
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1rem",
              }}
            >
              CTA Version
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            className="stat-box"
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0 auto 15px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
                color: "white",
              }}
            >
              ∞
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "5px",
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              30
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1rem",
              }}
            >
              Total Combos
            </div>
          </div>
        </div>
      </div>

      {/* Animate Button */}
      <button
        onClick={animateConnections}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
          border: "none",
          cursor: "pointer",
          fontSize: "2rem",
          color: "white",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="animate-btn"
      >
        ⚡
      </button>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes flowAnimation {
          0%,
          100% {
            stroke-dasharray: 5, 5;
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
          50% {
            stroke-dasharray: 5, 5;
            stroke-dashoffset: 10;
            opacity: 0.8;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .hook-element {
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
          position: relative;
        }

        .hook-element:hover {
          transform: scale(1.3);
          box-shadow: 0 12px 35px rgba(255, 107, 107, 0.5);
        }

        .hook-element .element-icon {
          font-size: 24px;
          color: white;
        }

        .body-element {
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, #4ecdc4, #44a8a8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
          position: relative;
        }

        .body-element:hover {
          transform: scale(1.4);
          box-shadow: 0 12px 35px rgba(78, 205, 196, 0.5);
        }

        .body-element:hover .element-icon {
          animation: rotate 2s linear infinite;
        }

        .body-element .element-icon {
          font-size: 24px;
          color: white;
        }

        .cta-element {
          width: 80px;
          height: 40px;
          background: linear-gradient(45deg, #45b7d1, #2980b9);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(69, 183, 209, 0.3);
          position: relative;
          border: 3px solid #2c3e50;
        }

        .cta-element:hover {
          transform: scale(1.2);
          box-shadow: 0 15px 40px rgba(69, 183, 209, 0.6);
        }

        .cta-element .element-icon {
          font-size: 20px;
          color: white;
        }

        .connection-line {
          stroke-width: 2;
          opacity: 0;
          transition: all 0.8s ease;
        }

        .connection-line.active {
          opacity: 0.6;
          animation: flowAnimation 3s ease-in-out infinite;
        }

        .stat-box:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .animate-btn:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 1024px) {
          .column-container {
            flex-direction: column;
            gap: 60px;
            padding: 20px;
          }

          .element-column {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CreativeTestingChart;
