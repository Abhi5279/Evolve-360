// // // // // export default function BikeLoader() {
// // // // //   return (
// // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">

// // // // //       <svg
// // // // //         className="bike w-40 h-auto text-[var(--color-primary)]"
// // // // //         viewBox="0 0 48 30"
// // // // //       >
// // // // //         <g
// // // // //           fill="none"
// // // // //           stroke="currentColor"
// // // // //           strokeLinecap="round"
// // // // //           strokeLinejoin="round"
// // // // //           strokeWidth="1.2"
// // // // //         >
// // // // //           {/* Left Wheel */}
// // // // //           <g transform="translate(9.5,19)">
// // // // //             <circle
// // // // //               className="bike__tire"
// // // // //               r="9"
// // // // //               strokeDasharray="56.549 56.549"
// // // // //             />
// // // // //             <g
// // // // //               className="bike__spokes-spin"
// // // // //               strokeDasharray="31.416 31.416"
// // // // //               strokeDashoffset="-23.562"
// // // // //             >
// // // // //               <circle className="bike__spokes" r="5" />
// // // // //               <circle
// // // // //                 className="bike__spokes"
// // // // //                 r="5"
// // // // //                 transform="rotate(180,0,0)"
// // // // //               />
// // // // //             </g>
// // // // //           </g>

// // // // //           {/* Pedals */}
// // // // //           <g transform="translate(24,19)">
// // // // //             <g
// // // // //               className="bike__pedals-spin"
// // // // //               strokeDasharray="25.133 25.133"
// // // // //               strokeDashoffset="-21.991"
// // // // //               transform="rotate(67.5,0,0)"
// // // // //             >
// // // // //               <circle className="bike__pedals" r="4" />
// // // // //               <circle
// // // // //                 className="bike__pedals"
// // // // //                 r="4"
// // // // //                 transform="rotate(180,0,0)"
// // // // //               />
// // // // //             </g>
// // // // //           </g>

// // // // //           {/* Right Wheel */}
// // // // //           <g transform="translate(38.5,19)">
// // // // //             <circle
// // // // //               className="bike__tire"
// // // // //               r="9"
// // // // //               strokeDasharray="56.549 56.549"
// // // // //             />
// // // // //             <g
// // // // //               className="bike__spokes-spin"
// // // // //               strokeDasharray="31.416 31.416"
// // // // //               strokeDashoffset="-23.562"
// // // // //             >
// // // // //               <circle className="bike__spokes" r="5" />
// // // // //               <circle
// // // // //                 className="bike__spokes"
// // // // //                 r="5"
// // // // //                 transform="rotate(180,0,0)"
// // // // //               />
// // // // //             </g>
// // // // //           </g>

// // // // //           {/* Frame */}
// // // // //           <polyline
// // // // //             className="bike__seat"
// // // // //             points="14 3,18 3"
// // // // //             strokeDasharray="5 5"
// // // // //           />
// // // // //           <polyline
// // // // //             className="bike__body"
// // // // //             points="16 3,24 19,9.5 19,18 8,34 7,24 19"
// // // // //             strokeDasharray="79 79"
// // // // //           />
// // // // //           <path
// // // // //             className="bike__handlebars"
// // // // //             d="m30,2h6s1,0,1,1-1,1-1,1"
// // // // //             strokeDasharray="10 10"
// // // // //           />
// // // // //           <polyline
// // // // //             className="bike__front"
// // // // //             points="32.5 2,38.5 19"
// // // // //             strokeDasharray="19 19"
// // // // //           />
// // // // //         </g>
// // // // //       </svg>

// // // // //     </div>
// // // // //   );
// // // // // }



// // // // export default function BikeLoader() {
// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         :root {
// // // //           --color-primary: #f97316;
// // // //         }

// // // //         @keyframes bikeFloat {
// // // //           0%, 100% { transform: translateY(0px); }
// // // //           50%       { transform: translateY(-4px); }
// // // //         }

// // // //         @keyframes bikeTireRotate {
// // // //           to { stroke-dashoffset: -56.549; }
// // // //         }

// // // //         @keyframes bikeWheelSpin {
// // // //           to { transform: rotate(360deg); }
// // // //         }

// // // //         @keyframes bikePedalSpin {
// // // //           to { transform: rotate(360deg); }
// // // //         }

// // // //         @keyframes bikeBodyDraw {
// // // //           0%   { stroke-dashoffset: 79; }
// // // //           100% { stroke-dashoffset: 0; }
// // // //         }

// // // //         @keyframes bikeSeatDraw {
// // // //           0%   { stroke-dashoffset: 5; }
// // // //           100% { stroke-dashoffset: 0; }
// // // //         }

// // // //         @keyframes bikeHandlebarsDraw {
// // // //           0%   { stroke-dashoffset: 10; }
// // // //           100% { stroke-dashoffset: 0; }
// // // //         }

// // // //         @keyframes bikeFrontDraw {
// // // //           0%   { stroke-dashoffset: 19; }
// // // //           100% { stroke-dashoffset: 0; }
// // // //         }

// // // //         .bike {
// // // //           animation: bikeFloat 1.4s ease-in-out infinite;
// // // //           filter: drop-shadow(0 6px 20px rgba(249, 115, 22, 0.4));
// // // //         }

// // // //         .bike__tire {
// // // //           stroke-dasharray: 56.549 56.549;
// // // //           animation: bikeTireRotate 0.75s linear infinite;
// // // //         }

// // // //         .bike__spokes-spin {
// // // //           transform-origin: 0 0;
// // // //           animation: bikeWheelSpin 0.75s linear infinite;
// // // //         }

// // // //         .bike__pedals-spin {
// // // //           transform-origin: 0 0;
// // // //           animation: bikePedalSpin 0.75s linear infinite;
// // // //         }

// // // //         .bike__body {
// // // //           stroke-dasharray: 79 79;
// // // //           animation: bikeBodyDraw 0.6s ease-out forwards;
// // // //         }

// // // //         .bike__seat {
// // // //           stroke-dasharray: 5 5;
// // // //           animation: bikeSeatDraw 0.3s ease-out 0.1s forwards;
// // // //           stroke-dashoffset: 5;
// // // //         }

// // // //         .bike__handlebars {
// // // //           stroke-dasharray: 10 10;
// // // //           animation: bikeHandlebarsDraw 0.3s ease-out 0.2s forwards;
// // // //           stroke-dashoffset: 10;
// // // //         }

// // // //         .bike__front {
// // // //           stroke-dasharray: 19 19;
// // // //           animation: bikeFrontDraw 0.3s ease-out 0.3s forwards;
// // // //           stroke-dashoffset: 19;
// // // //         }
// // // //       `}</style>

// // // //       <div
// // // //         style={{
// // // //           position: "fixed",
// // // //           inset: 0,
// // // //           zIndex: 50,
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //           backgroundColor: "rgba(0,0,0,0.3)",
// // // //           backdropFilter: "blur(8px)",
// // // //         }}
// // // //       >
// // // //         <svg
// // // //           className="bike"
// // // //           style={{ width: "160px", height: "auto", color: "var(--color-primary)" }}
// // // //           viewBox="0 0 48 30"
// // // //         >
// // // //           <g
// // // //             fill="none"
// // // //             stroke="currentColor"
// // // //             strokeLinecap="round"
// // // //             strokeLinejoin="round"
// // // //             strokeWidth="1.2"
// // // //           >
// // // //             {/* Left Wheel */}
// // // //             <g transform="translate(9.5,19)">
// // // //               <circle
// // // //                 className="bike__tire"
// // // //                 r="9"
// // // //                 strokeDasharray="56.549 56.549"
// // // //               />
// // // //               <g
// // // //                 className="bike__spokes-spin"
// // // //                 strokeDasharray="31.416 31.416"
// // // //                 strokeDashoffset="-23.562"
// // // //               >
// // // //                 <circle className="bike__spokes" r="5" />
// // // //                 <circle
// // // //                   className="bike__spokes"
// // // //                   r="5"
// // // //                   transform="rotate(180,0,0)"
// // // //                 />
// // // //               </g>
// // // //             </g>

// // // //             {/* Pedals */}
// // // //             <g transform="translate(24,19)">
// // // //               <g
// // // //                 className="bike__pedals-spin"
// // // //                 strokeDasharray="25.133 25.133"
// // // //                 strokeDashoffset="-21.991"
// // // //                 transform="rotate(67.5,0,0)"
// // // //               >
// // // //                 <circle className="bike__pedals" r="4" />
// // // //                 <circle
// // // //                   className="bike__pedals"
// // // //                   r="4"
// // // //                   transform="rotate(180,0,0)"
// // // //                 />
// // // //               </g>
// // // //             </g>

// // // //             {/* Right Wheel */}
// // // //             <g transform="translate(38.5,19)">
// // // //               <circle
// // // //                 className="bike__tire"
// // // //                 r="9"
// // // //                 strokeDasharray="56.549 56.549"
// // // //               />
// // // //               <g
// // // //                 className="bike__spokes-spin"
// // // //                 strokeDasharray="31.416 31.416"
// // // //                 strokeDashoffset="-23.562"
// // // //               >
// // // //                 <circle className="bike__spokes" r="5" />
// // // //                 <circle
// // // //                   className="bike__spokes"
// // // //                   r="5"
// // // //                   transform="rotate(180,0,0)"
// // // //                 />
// // // //               </g>
// // // //             </g>

// // // //             {/* Frame */}
// // // //             <polyline
// // // //               className="bike__seat"
// // // //               points="14 3,18 3"
// // // //               strokeDasharray="5 5"
// // // //             />
// // // //             <polyline
// // // //               className="bike__body"
// // // //               points="16 3,24 19,9.5 19,18 8,34 7,24 19"
// // // //               strokeDasharray="79 79"
// // // //             />
// // // //             <path
// // // //               className="bike__handlebars"
// // // //               d="m30,2h6s1,0,1,1-1,1-1,1"
// // // //               strokeDasharray="10 10"
// // // //             />
// // // //             <polyline
// // // //               className="bike__front"
// // // //               points="32.5 2,38.5 19"
// // // //               strokeDasharray="19 19"
// // // //             />
// // // //           </g>
// // // //         </svg>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }

// // // export default function BikeLoader() {
// // //   return (
// // //     <>
// // //       <style>{`
// // //         :root {
// // //           --color-primary: #f97316;
// // //         }

// // //         @keyframes bikeFloat {
// // //           0%, 100% { transform: translateY(0px); }
// // //           50%       { transform: translateY(-4px); }
// // //         }

// // //         @keyframes bikeTireRotate {
// // //           to { stroke-dashoffset: -56.549; }
// // //         }

// // //         @keyframes bikeWheelSpin {
// // //           to { transform: rotate(360deg); }
// // //         }

// // //         @keyframes bikePedalSpin {
// // //           to { transform: rotate(360deg); }
// // //         }

// // //         @keyframes bikeBodyDraw {
// // //           0%   { stroke-dashoffset: 79; }
// // //           100% { stroke-dashoffset: 0; }
// // //         }

// // //         @keyframes bikeSeatDraw {
// // //           0%   { stroke-dashoffset: 5; }
// // //           100% { stroke-dashoffset: 0; }
// // //         }

// // //         @keyframes bikeHandlebarsDraw {
// // //           0%   { stroke-dashoffset: 10; }
// // //           100% { stroke-dashoffset: 0; }
// // //         }

// // //         @keyframes bikeFrontDraw {
// // //           0%   { stroke-dashoffset: 19; }
// // //           100% { stroke-dashoffset: 0; }
// // //         }

// // //         .bike {
// // //           animation: bikeFloat 1.4s ease-in-out infinite;
// // //           filter: drop-shadow(0 4px 10px rgba(249, 115, 22, 0.3));
// // //         }

// // //         .bike__tire {
// // //           stroke-dasharray: 56.549 56.549;
// // //           animation: bikeTireRotate 0.75s linear infinite;
// // //         }

// // //         .bike__spokes-spin {
// // //           transform-origin: 0 0;
// // //           animation: bikeWheelSpin 0.75s linear infinite;
// // //         }

// // //         .bike__pedals-spin {
// // //           transform-origin: 0 0;
// // //           animation: bikePedalSpin 0.75s linear infinite;
// // //         }

// // //         .bike__body {
// // //           stroke-dasharray: 79 79;
// // //           animation: bikeBodyDraw 0.6s ease-out forwards;
// // //         }

// // //         .bike__seat {
// // //           stroke-dasharray: 5 5;
// // //           animation: bikeSeatDraw 0.3s ease-out 0.1s forwards;
// // //           stroke-dashoffset: 5;
// // //         }

// // //         .bike__handlebars {
// // //           stroke-dasharray: 10 10;
// // //           animation: bikeHandlebarsDraw 0.3s ease-out 0.2s forwards;
// // //           stroke-dashoffset: 10;
// // //         }

// // //         .bike__front {
// // //           stroke-dasharray: 19 19;
// // //           animation: bikeFrontDraw 0.3s ease-out 0.3s forwards;
// // //           stroke-dashoffset: 19;
// // //         }
// // //       `}</style>

// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           inset: 0,
// // //           zIndex: 9999, // Ensure it sits on top of everything
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           backgroundColor: "rgba(0, 0, 0, 0.15)", // Lighter overlay
// // //           backdropFilter: "blur(3px)", // Reduced blur for a cleaner look
// // //         }}
// // //       >
// // //         <div style={{ textAlign: "center" }}>
// // //           <svg
// // //             className="bike"
// // //             style={{ 
// // //               width: "80px", // Reduced size from 160px
// // //               height: "auto", 
// // //               color: "var(--color-primary)" 
// // //             }}
// // //             viewBox="0 0 48 30"
// // //           >
// // //             <g
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeLinecap="round"
// // //               strokeLinejoin="round"
// // //               strokeWidth="1.2"
// // //             >
// // //               {/* Left Wheel */}
// // //               <g transform="translate(9.5,19)">
// // //                 <circle
// // //                   className="bike__tire"
// // //                   r="9"
// // //                 />
// // //                 <g
// // //                   className="bike__spokes-spin"
// // //                   strokeDasharray="31.416 31.416"
// // //                   strokeDashoffset="-23.562"
// // //                 >
// // //                   <circle r="5" />
// // //                   <circle
// // //                     r="5"
// // //                     transform="rotate(180,0,0)"
// // //                   />
// // //                 </g>
// // //               </g>

// // //               {/* Pedals */}
// // //               <g transform="translate(24,19)">
// // //                 <g
// // //                   className="bike__pedals-spin"
// // //                   strokeDasharray="25.133 25.133"
// // //                   strokeDashoffset="-21.991"
// // //                   transform="rotate(67.5,0,0)"
// // //                 >
// // //                   <circle r="4" />
// // //                   <circle
// // //                     r="4"
// // //                     transform="rotate(180,0,0)"
// // //                   />
// // //                 </g>
// // //               </g>

// // //               {/* Right Wheel */}
// // //               <g transform="translate(38.5,19)">
// // //                 <circle
// // //                   className="bike__tire"
// // //                   r="9"
// // //                 />
// // //                 <g
// // //                   className="bike__spokes-spin"
// // //                   strokeDasharray="31.416 31.416"
// // //                   strokeDashoffset="-23.562"
// // //                 >
// // //                   <circle r="5" />
// // //                   <circle
// // //                     r="5"
// // //                     transform="rotate(180,0,0)"
// // //                   />
// // //                 </g>
// // //               </g>

// // //               {/* Frame */}
// // //               <polyline
// // //                 className="bike__seat"
// // //                 points="14 3,18 3"
// // //               />
// // //               <polyline
// // //                 className="bike__body"
// // //                 points="16 3,24 19,9.5 19,18 8,34 7,24 19"
// // //               />
// // //               <path
// // //                 className="bike__handlebars"
// // //                 d="m30,2h6s1,0,1,1-1,1-1,1"
// // //               />
// // //               <polyline
// // //                 className="bike__front"
// // //                 points="32.5 2,38.5 19"
// // //               />
// // //             </g>
// // //           </svg>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // import { useEffect } from "react";

// // export default function BikeLoader({ label = "Loading…" }) {

// //   // Lock scroll and block all interaction on the page behind the loader
// //   useEffect(() => {
// //     const prev = document.body.style.overflow;
// //     document.body.style.overflow = "hidden";
// //     document.body.style.pointerEvents = "none";
// //     return () => {
// //       document.body.style.overflow = prev;
// //       document.body.style.pointerEvents = "";
// //     };
// //   }, []);

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes bikeFloat {
// //           0%, 100% { transform: translateY(0px);  }
// //           50%       { transform: translateY(-5px); }
// //         }
// //         @keyframes bikeTireRotate {
// //           to { stroke-dashoffset: -56.549; }
// //         }
// //         @keyframes bikeWheelSpin {
// //           to { transform: rotate(360deg); }
// //         }
// //         @keyframes bikePedalSpin {
// //           to { transform: rotate(360deg); }
// //         }
// //         @keyframes bikeBodyDraw {
// //           0%   { stroke-dashoffset: 79; }
// //           100% { stroke-dashoffset: 0;  }
// //         }
// //         @keyframes bikeSeatDraw {
// //           0%   { stroke-dashoffset: 5; }
// //           100% { stroke-dashoffset: 0; }
// //         }
// //         @keyframes bikeHandlebarsDraw {
// //           0%   { stroke-dashoffset: 10; }
// //           100% { stroke-dashoffset: 0;  }
// //         }
// //         @keyframes bikeFrontDraw {
// //           0%   { stroke-dashoffset: 19; }
// //           100% { stroke-dashoffset: 0;  }
// //         }
// //         @keyframes bikeLabel {
// //           0%, 100% { opacity: 0.4; letter-spacing: 0.22em; }
// //           50%       { opacity: 1;   letter-spacing: 0.28em; }
// //         }
// //         @keyframes bikeBarPulse {
// //           0%, 100% { width: 18px; opacity: 0.3; }
// //           50%       { width: 36px; opacity: 1;   }
// //         }

// //         /* ── Bike SVG ── */
// //         .epa-bike {
// //           animation: bikeFloat 1.4s ease-in-out infinite;
// //           filter: drop-shadow(0 6px 18px rgba(198,167,94,0.35));
// //         }
// //         .epa-bike__tire {
// //           stroke-dasharray: 56.549 56.549;
// //           animation: bikeTireRotate 0.7s linear infinite;
// //         }
// //         .epa-bike__spokes-spin {
// //           transform-origin: 0 0;
// //           animation: bikeWheelSpin 0.7s linear infinite;
// //         }
// //         .epa-bike__pedals-spin {
// //           transform-origin: 0 0;
// //           animation: bikePedalSpin 0.7s linear infinite;
// //         }
// //         .epa-bike__body {
// //           stroke-dasharray: 79 79;
// //           animation: bikeBodyDraw 0.6s ease-out forwards;
// //         }
// //         .epa-bike__seat {
// //           stroke-dasharray: 5 5;
// //           stroke-dashoffset: 5;
// //           animation: bikeSeatDraw 0.3s ease-out 0.1s forwards;
// //         }
// //         .epa-bike__handlebars {
// //           stroke-dasharray: 10 10;
// //           stroke-dashoffset: 10;
// //           animation: bikeHandlebarsDraw 0.3s ease-out 0.2s forwards;
// //         }
// //         .epa-bike__front {
// //           stroke-dasharray: 19 19;
// //           stroke-dashoffset: 19;
// //           animation: bikeFrontDraw 0.3s ease-out 0.3s forwards;
// //         }

// //         /* ── Label ── */
// //         .epa-bike-label {
// //           font-family: 'DM Sans', sans-serif;
// //           font-size: 9px;
// //           font-weight: 600;
// //           letter-spacing: 0.22em;
// //           text-transform: uppercase;
// //           color: rgba(198,167,94,0.6);
// //           margin-top: 20px;
// //           animation: bikeLabel 1.8s ease-in-out infinite;
// //         }

// //         /* ── Progress bar ── */
// //         .epa-bike-bar {
// //           height: 1px;
// //           background: #C6A75E;
// //           border-radius: 1px;
// //           margin-top: 14px;
// //           animation: bikeBarPulse 1.4s ease-in-out infinite;
// //         }
// //       `}</style>

// //       {/* Overlay — pointer-events: all overrides the body block just for the overlay itself */}
// //       <div
// //         style={{
// //           position:       "fixed",
// //           inset:          0,
// //           zIndex:         99999,
// //           display:        "flex",
// //           flexDirection:  "column",
// //           alignItems:     "center",
// //           justifyContent: "center",
// //           backgroundColor:"rgba(17,17,17,0.82)",
// //           backdropFilter: "blur(5px)",
// //           pointerEvents:  "all",   // overlay catches all clicks — nothing bleeds through
// //         }}
// //       >
// //         {/* Card */}
// //         <div style={{
// //           display:        "flex",
// //           flexDirection:  "column",
// //           alignItems:     "center",
// //           padding:        "36px 48px",
// //           borderRadius:   "var(--epa-radius, 8px)",
// //           border:         "1px solid rgba(198,167,94,0.18)",
// //           background:     "rgba(28,28,28,0.9)",
// //           boxShadow:      "0 24px 64px rgba(0,0,0,0.5)",
// //         }}>

// //           {/* Bike SVG — gold stroke */}
// //           <svg
// //             className="epa-bike"
// //             viewBox="0 0 48 30"
// //             style={{ width: 88, height: "auto", color: "#C6A75E" }}
// //           >
// //             <g
// //               fill="none"
// //               stroke="currentColor"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               strokeWidth="1.2"
// //             >
// //               {/* Left Wheel */}
// //               <g transform="translate(9.5,19)">
// //                 <circle className="epa-bike__tire" r="9" />
// //                 <g
// //                   className="epa-bike__spokes-spin"
// //                   strokeDasharray="31.416 31.416"
// //                   strokeDashoffset="-23.562"
// //                 >
// //                   <circle r="5" />
// //                   <circle r="5" transform="rotate(180,0,0)" />
// //                 </g>
// //               </g>

// //               {/* Pedals */}
// //               <g transform="translate(24,19)">
// //                 <g
// //                   className="epa-bike__pedals-spin"
// //                   strokeDasharray="25.133 25.133"
// //                   strokeDashoffset="-21.991"
// //                   transform="rotate(67.5,0,0)"
// //                 >
// //                   <circle r="4" />
// //                   <circle r="4" transform="rotate(180,0,0)" />
// //                 </g>
// //               </g>

// //               {/* Right Wheel */}
// //               <g transform="translate(38.5,19)">
// //                 <circle className="epa-bike__tire" r="9" />
// //                 <g
// //                   className="epa-bike__spokes-spin"
// //                   strokeDasharray="31.416 31.416"
// //                   strokeDashoffset="-23.562"
// //                 >
// //                   <circle r="5" />
// //                   <circle r="5" transform="rotate(180,0,0)" />
// //                 </g>
// //               </g>

// //               {/* Frame */}
// //               <polyline className="epa-bike__seat"       points="14 3,18 3" />
// //               <polyline className="epa-bike__body"       points="16 3,24 19,9.5 19,18 8,34 7,24 19" />
// //               <path     className="epa-bike__handlebars" d="m30,2h6s1,0,1,1-1,1-1,1" />
// //               <polyline className="epa-bike__front"      points="32.5 2,38.5 19" />
// //             </g>
// //           </svg>

// //           {/* Label */}
// //           <p className="epa-bike-label">{label}</p>

// //           {/* Animated gold bar */}
// //           <div className="epa-bike-bar" />
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import { useEffect } from "react";

// export default function BikeLoader({ label = "Loading…" }) {

//   useEffect(() => {
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     document.body.style.pointerEvents = "none";
//     return () => {
//       document.body.style.overflow = prev;
//       document.body.style.pointerEvents = "";
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

//         /* ── Bike SVG animations (unchanged) ── */
//         @keyframes bikeTireRotate {
//           to { stroke-dashoffset: -56.549; }
//         }
//         @keyframes bikeWheelSpin {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes bikePedalSpin {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes bikeBodyDraw {
//           0%   { stroke-dashoffset: 79; }
//           100% { stroke-dashoffset: 0;  }
//         }
//         @keyframes bikeSeatDraw {
//           0%   { stroke-dashoffset: 5; }
//           100% { stroke-dashoffset: 0; }
//         }
//         @keyframes bikeHandlebarsDraw {
//           0%   { stroke-dashoffset: 10; }
//           100% { stroke-dashoffset: 0;  }
//         }
//         @keyframes bikeFrontDraw {
//           0%   { stroke-dashoffset: 19; }
//           100% { stroke-dashoffset: 0;  }
//         }

//         /* ── NEW overlay animations ── */
//         @keyframes loaderFadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes cardSlideUp {
//           from { opacity: 0; transform: translateY(24px) scale(0.96); }
//           to   { opacity: 1; transform: translateY(0)    scale(1);    }
//         }
//         @keyframes labelShimmer {
//           0%   { background-position: -200% center; }
//           100% { background-position:  200% center; }
//         }
//         @keyframes progressSweep {
//           0%   { transform: translateX(-100%); }
//           100% { transform: translateX(400%); }
//         }
//         @keyframes dotPop {
//           0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
//           40%            { transform: scale(1.0); opacity: 1;   }
//         }
//         @keyframes ringExpand {
//           0%   { transform: scale(0.7); opacity: 0.6; }
//           100% { transform: scale(1.6); opacity: 0;   }
//         }
//         @keyframes gradientShift {
//           0%   { background-position: 0%   50%; }
//           50%  { background-position: 100% 50%; }
//           100% { background-position: 0%   50%; }
//         }

//         /* ── Bike SVG classes ── */
//         .bl-bike {
//           filter: drop-shadow(0 4px 16px rgba(99,102,241,0.40));
//         }
//         .bl-bike__tire {
//           stroke-dasharray: 56.549 56.549;
//           animation: bikeTireRotate 0.7s linear infinite;
//         }
//         .bl-bike__spokes-spin {
//           transform-origin: 0 0;
//           animation: bikeWheelSpin 0.7s linear infinite;
//         }
//         .bl-bike__pedals-spin {
//           transform-origin: 0 0;
//           animation: bikePedalSpin 0.7s linear infinite;
//         }
//         .bl-bike__body {
//           stroke-dasharray: 79 79;
//           animation: bikeBodyDraw 0.6s ease-out forwards;
//         }
//         .bl-bike__seat {
//           stroke-dasharray: 5 5;
//           stroke-dashoffset: 5;
//           animation: bikeSeatDraw 0.3s ease-out 0.1s forwards;
//         }
//         .bl-bike__handlebars {
//           stroke-dasharray: 10 10;
//           stroke-dashoffset: 10;
//           animation: bikeHandlebarsDraw 0.3s ease-out 0.2s forwards;
//         }
//         .bl-bike__front {
//           stroke-dasharray: 19 19;
//           stroke-dashoffset: 19;
//           animation: bikeFrontDraw 0.3s ease-out 0.3s forwards;
//         }

//         /* ── Label shimmer ── */
//         .bl-label {
//           font-family: 'Outfit', sans-serif;
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.22em;
//           text-transform: uppercase;
//           background: linear-gradient(
//             90deg,
//             #6366f1 0%,
//             #a5b4fc 40%,
//             #7c3aed 60%,
//             #6366f1 100%
//           );
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: labelShimmer 2s linear infinite;
//           margin-top: 22px;
//         }

//         /* ── Progress track ── */
//         .bl-track {
//           width: 100%;
//           height: 3px;
//           border-radius: 99px;
//           background: rgba(99,102,241,0.12);
//           overflow: hidden;
//           margin-top: 14px;
//           position: relative;
//         }
//         .bl-track-fill {
//           position: absolute;
//           top: 0; left: 0;
//           height: 100%;
//           width: 45%;
//           border-radius: 99px;
//           background: linear-gradient(90deg, #2563eb, #6366f1, #7c3aed);
//           animation: progressSweep 1.4s ease-in-out infinite;
//         }

//         /* ── Dots ── */
//         .bl-dots {
//           display: flex;
//           gap: 6px;
//           margin-top: 16px;
//           align-items: center;
//         }
//         .bl-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #6366f1;
//           animation: dotPop 1.2s ease-in-out infinite;
//         }
//         .bl-dot:nth-child(1) { animation-delay: 0s;    }
//         .bl-dot:nth-child(2) { animation-delay: 0.15s; background: #818cf8; }
//         .bl-dot:nth-child(3) { animation-delay: 0.30s; background: #7c3aed; }
//       `}</style>

//       {/* ── Overlay ── */}
//       <div style={{
//         position:       "fixed",
//         inset:          0,
//         zIndex:         99999,
//         display:        "flex",
//         flexDirection:  "column",
//         alignItems:     "center",
//         justifyContent: "center",
//         background:     "rgba(238,242,255,0.72)",
//         backdropFilter: "blur(12px)",
//         WebkitBackdropFilter: "blur(12px)",
//         pointerEvents:  "all",
//         animation:      "loaderFadeIn 0.25s ease forwards",
//       }}>

//         {/* Expanding ring behind card */}
//         <div style={{
//           position: "absolute",
//           width: 220, height: 220,
//           borderRadius: "50%",
//           border: "1.5px solid rgba(99,102,241,0.18)",
//           animation: "ringExpand 2s ease-out infinite",
//           pointerEvents: "none",
//         }} />
//         <div style={{
//           position: "absolute",
//           width: 220, height: 220,
//           borderRadius: "50%",
//           border: "1.5px solid rgba(99,102,241,0.10)",
//           animation: "ringExpand 2s ease-out 0.7s infinite",
//           pointerEvents: "none",
//         }} />

//         {/* Card */}
//         <div style={{
//           display:        "flex",
//           flexDirection:  "column",
//           alignItems:     "center",
//           padding:        "40px 52px 36px",
//           borderRadius:   20,
//           border:         "1px solid rgba(255,255,255,0.9)",
//           background:     "rgba(255,255,255,0.88)",
//           backdropFilter: "blur(20px)",
//           WebkitBackdropFilter: "blur(20px)",
//           boxShadow:      "0 8px 48px rgba(99,102,241,0.16), 0 2px 8px rgba(0,0,0,0.06)",
//           animation:      "cardSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
//           position:       "relative",
//           overflow:       "hidden",
//         }}>

//           {/* Gradient top line */}
//           <div style={{
//             position: "absolute", top: 0, left: 0, right: 0,
//             height: 2,
//             background: "linear-gradient(90deg, #2563eb, #6366f1, #7c3aed, #6366f1, #2563eb)",
//             backgroundSize: "200% auto",
//             animation: "gradientShift 2.4s linear infinite",
//           }} />

//           {/* Bike SVG — indigo stroke */}
//           <svg
//             className="bl-bike"
//             viewBox="0 0 48 30"
//             style={{ width: 92, height: "auto", color: "#6366f1" }}
//           >
//             <g
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="1.2"
//             >
//               {/* Left Wheel */}
//               <g transform="translate(9.5,19)">
//                 <circle className="bl-bike__tire" r="9" />
//                 <g
//                   className="bl-bike__spokes-spin"
//                   strokeDasharray="31.416 31.416"
//                   strokeDashoffset="-23.562"
//                 >
//                   <circle r="5" />
//                   <circle r="5" transform="rotate(180,0,0)" />
//                 </g>
//               </g>

//               {/* Pedals */}
//               <g transform="translate(24,19)">
//                 <g
//                   className="bl-bike__pedals-spin"
//                   strokeDasharray="25.133 25.133"
//                   strokeDashoffset="-21.991"
//                   transform="rotate(67.5,0,0)"
//                 >
//                   <circle r="4" />
//                   <circle r="4" transform="rotate(180,0,0)" />
//                 </g>
//               </g>

//               {/* Right Wheel */}
//               <g transform="translate(38.5,19)">
//                 <circle className="bl-bike__tire" r="9" />
//                 <g
//                   className="bl-bike__spokes-spin"
//                   strokeDasharray="31.416 31.416"
//                   strokeDashoffset="-23.562"
//                 >
//                   <circle r="5" />
//                   <circle r="5" transform="rotate(180,0,0)" />
//                 </g>
//               </g>

//               {/* Frame */}
//               <polyline className="bl-bike__seat"       points="14 3,18 3" />
//               <polyline className="bl-bike__body"       points="16 3,24 19,9.5 19,18 8,34 7,24 19" />
//               <path     className="bl-bike__handlebars" d="m30,2h6s1,0,1,1-1,1-1,1" />
//               <polyline className="bl-bike__front"      points="32.5 2,38.5 19" />
//             </g>
//           </svg>

//           {/* Shimmer label */}
//           <p className="bl-label">{label}</p>

//           {/* Progress sweep bar */}
//           <div className="bl-track">
//             <div className="bl-track-fill" />
//           </div>

//           {/* Dot indicators */}
//           <div className="bl-dots">
//             <div className="bl-dot" />
//             <div className="bl-dot" />
//             <div className="bl-dot" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect } from "react";

export default function BikeLoader({ label = "Loading…" }) {

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    return () => {
      document.body.style.overflow = prev;
      document.body.style.pointerEvents = "";
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes loaderFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Dumbbell lifts up and tilts */
        @keyframes dumbbellLift {
          0%   { transform: translateY(0px)   rotate(-6deg); }
          45%  { transform: translateY(-28px) rotate(10deg); }
          55%  { transform: translateY(-28px) rotate(10deg); }
          100% { transform: translateY(0px)   rotate(-6deg); }
        }

        /* Plates bounce at peak */
        @keyframes plateBounce {
          0%,40%,60%,100% { transform: scaleY(1);    }
          50%              { transform: scaleY(1.05); }
        }

        /* Ground shadow shrinks as weight lifts */
        @keyframes shadowPulse {
          0%   { transform: scaleX(1);    opacity: 0.3;  }
          45%  { transform: scaleX(0.5);  opacity: 0.10; }
          55%  { transform: scaleX(0.5);  opacity: 0.10; }
          100% { transform: scaleX(1);    opacity: 0.3;  }
        }

        /* Label shimmer */
        @keyframes labelShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* Progress sweep */
        @keyframes progressSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%);  }
        }

        /* Dot pop */
        @keyframes dotPop {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.25; }
          40%            { transform: scale(1.0);  opacity: 1;    }
        }

        /* Ring expand */
        @keyframes ringExpand {
          0%   { transform: scale(0.65); opacity: 0.55; }
          100% { transform: scale(1.9);  opacity: 0;    }
        }

        /* ── classes ── */
        .db-wrap {
          animation: dumbbellLift 1.5s cubic-bezier(0.4,0,0.2,1) infinite;
          filter: drop-shadow(0 10px 28px rgba(99,102,241,0.5));
        }

        .db-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #6366f1 0%, #a5b4fc 40%, #7c3aed 60%, #6366f1 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: labelShimmer 2s linear infinite;
          margin-top: 24px;
        }

        .db-track {
          width: 120px;
          height: 3px;
          border-radius: 99px;
          background: rgba(99,102,241,0.15);
          overflow: hidden;
          margin-top: 14px;
          position: relative;
        }
        .db-track-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%; width: 45%;
          border-radius: 99px;
          background: linear-gradient(90deg, #2563eb, #6366f1, #7c3aed);
          animation: progressSweep 1.4s ease-in-out infinite;
        }

        .db-dots {
          display: flex; gap: 6px;
          margin-top: 14px;
          align-items: center;
        }
        .db-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #6366f1;
          animation: dotPop 1.2s ease-in-out infinite;
        }
        .db-dot:nth-child(1) { animation-delay: 0s;    }
        .db-dot:nth-child(2) { animation-delay: 0.15s; background: #818cf8; }
        .db-dot:nth-child(3) { animation-delay: 0.30s; background: #7c3aed; }
      `}</style>

      {/* ── Overlay — no card, pure frosted backdrop ── */}
      <div style={{
        position:             "fixed",
        inset:                0,
        zIndex:               99999,
        display:              "flex",
        flexDirection:        "column",
        alignItems:           "center",
        justifyContent:       "center",
        background:           "rgba(238,242,255,0.60)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        pointerEvents:        "all",
        animation:            "loaderFadeIn 0.3s ease forwards",
      }}>

        {/* Three staggered expanding rings */}
        {[0, 0.5, 1.0].map((delay, i) => (
          <div key={i} style={{
            position:      "absolute",
            width:         180, height: 180,
            borderRadius:  "50%",
            border:        `1px solid rgba(99,102,241,${0.20 - i * 0.05})`,
            animation:     `ringExpand 2.4s ease-out ${delay}s infinite`,
            pointerEvents: "none",
          }} />
        ))}

        {/* ── Dumbbell SVG ── */}
        <div className="db-wrap">
          <svg viewBox="0 0 140 80" width="160" height="100"
               fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#818cf8"/>
                <stop offset="100%" stopColor="#4338ca"/>
              </linearGradient>
              <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#c7d2fe"/>
                <stop offset="50%"  stopColor="#e0e7ff"/>
                <stop offset="100%" stopColor="#c7d2fe"/>
              </linearGradient>
              <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#6366f1"/>
                <stop offset="100%" stopColor="#4f46e5"/>
              </linearGradient>
            </defs>

            {/* ══ LEFT SIDE ══ */}
            {/* Big outer plate */}
            <rect x="4"  y="18" width="14" height="44" rx="4"
                  fill="url(#plateGrad)" stroke="#4338ca" strokeWidth="0.7"
                  className="db-plate"/>
            {/* Shine */}
            <rect x="6"  y="21" width="4"  height="14" rx="2"
                  fill="rgba(255,255,255,0.22)"/>
            {/* Medium plate */}
            <rect x="18" y="23" width="9"  height="34" rx="3"
                  fill="url(#plateGrad)" stroke="#4338ca" strokeWidth="0.7"/>
            <rect x="20" y="26" width="3"  height="10" rx="1.5"
                  fill="rgba(255,255,255,0.18)"/>
            {/* Collar */}
            <rect x="27" y="28" width="7"  height="24" rx="2"
                  fill="url(#collarGrad)" stroke="#3730a3" strokeWidth="0.6"/>
            {/* Grip lines */}
            {[31,35,39].map(y => (
              <line key={y} x1="28" y1={y} x2="33" y2={y}
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
            ))}

            {/* ══ BAR ══ */}
            <rect x="34" y="33" width="72" height="14" rx="7"
                  fill="url(#barGrad)" stroke="#c7d2fe" strokeWidth="0.7"/>
            {/* Highlight strip */}
            <rect x="36" y="35" width="68" height="4" rx="2"
                  fill="rgba(255,255,255,0.55)"/>
            {/* Center knurl marks */}
            {[60,65,70,75,80].map(x => (
              <line key={x} x1={x} y1="34" x2={x} y2="46"
                    stroke="rgba(99,102,241,0.25)" strokeWidth="1"/>
            ))}

            {/* ══ RIGHT SIDE ══ */}
            {/* Collar */}
            <rect x="106" y="28" width="7"  height="24" rx="2"
                  fill="url(#collarGrad)" stroke="#3730a3" strokeWidth="0.6"/>
            {[31,35,39].map(y => (
              <line key={y} x1="107" y1={y} x2="112" y2={y}
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
            ))}
            {/* Medium plate */}
            <rect x="113" y="23" width="9"  height="34" rx="3"
                  fill="url(#plateGrad)" stroke="#4338ca" strokeWidth="0.7"/>
            <rect x="115" y="26" width="3"  height="10" rx="1.5"
                  fill="rgba(255,255,255,0.18)"/>
            {/* Big outer plate */}
            <rect x="122" y="18" width="14" height="44" rx="4"
                  fill="url(#plateGrad)" stroke="#4338ca" strokeWidth="0.7"/>
            <rect x="124" y="21" width="4"  height="14" rx="2"
                  fill="rgba(255,255,255,0.22)"/>
          </svg>
        </div>

        {/* Shrinking ground shadow */}
        <div style={{
          width:        110,
          height:       10,
          borderRadius: "50%",
          background:   "rgba(99,102,241,0.18)",
          filter:       "blur(8px)",
          marginTop:    -4,
          animation:    "shadowPulse 1.5s cubic-bezier(0.4,0,0.2,1) infinite",
        }} />

        {/* Shimmer label */}
        <p className="db-label">{label}</p>

        {/* Progress sweep */}
        <div className="db-track">
          <div className="db-track-fill" />
        </div>

        {/* Dot indicators */}
        <div className="db-dots">
          <div className="db-dot" />
          <div className="db-dot" />
          <div className="db-dot" />
        </div>

      </div>
    </>
  );
}