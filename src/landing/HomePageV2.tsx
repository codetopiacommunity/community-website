/* eslint-disable @next/next/no-img-element */
import svgPaths from "./svg-6ccbeknhhr";

const logoWordmark = "/images/codetopia-logo.png";
const heroBackground = "/images/hero-background.jpg";
const eventsIcon = "/images/icon-events.png";
const articlesIcon = "/images/icon-articles.png";
const communityIcon = "/images/icon-community.png";
const statsBackgroundLeft = "/images/stats-bg-1.png";
const accentDots = "/images/accent-dots.png";
const statsBackgroundRight = "/images/stats-bg-2.png";
const eventPhotoPrimary = "/images/event-photo-1.png";
const logoMark = "/images/codetopia-logo-mark.png";
const eventPhotoSecondary = "/images/event-photo-2.png";
const eventPhotoTertiary = "/images/event-photo-3.png";
const articleCoverOne = "/images/article-illustration-1.png";
const authorAvatar = "/images/author-avatar.png";
const articleCoverTwo = "/images/article-illustration-2.png";
const articleCoverThree = "/images/article-illustration-3.png";

function NavLink() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex items-center px-[16px] py-[8px] relative shrink-0"
      data-name="Nav link"
    >
      <span className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#e9e9e9] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        ABOUT
      </span>
    </a>
  );
}

function NavLink1() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex items-center px-[16px] py-[8px] relative shrink-0"
      data-name="Nav link"
    >
      <span className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#e9e9e9] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        {`EVENT & ACTIVITIES`}
      </span>
    </a>
  );
}

function NavLink2() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative shrink-0"
      data-name="Nav link"
    >
      <span className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#e9e9e9] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        ARTICLES
      </span>
    </a>
  );
}

function NavLink3() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center px-[16px] py-[8px] relative shrink-0"
      data-name="Nav link"
    >
      <span className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#e9e9e9] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        GALLERY
      </span>
    </a>
  );
}

function NavLinks() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Nav links">
      <NavLink />
      <NavLink1 />
      <NavLink2 />
      <NavLink3 />
    </div>
  );
}

function NavigationLinks() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Navigation Links">
      <NavLinks />
    </div>
  );
}

function NavbarContent() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Navbar content">
      <div className="h-[55px] relative shrink-0 w-[98px]" data-name="Codetopia-Logo-TW 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={logoWordmark} />
      </div>
      <NavigationLinks />
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-[#161616] relative shrink-0 w-full" data-name="Navbar">
      <div aria-hidden="true" className="absolute border-[#767676] border-[0px_0px_0.5px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[128px] py-[16px] relative w-full">
          <NavbarContent />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center w-[828px]">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[84px] min-w-full relative shrink-0 text-[#e9e9e9] text-[72px] tracking-[-0.18px] w-[min-content]">BUILDING A COMMUNITY FOR THE FUTURE</p>
      <p className="font-['Archivo:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#c9c9c9] text-[22px] w-[540px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        A thriving tech community where tech enthusiast come together to learn, share, and grow
      </p>
    </div>
  );
}

function ButtonCodetopia() {
  return (
    <a
      href="#"
      className="bg-[#1f1f1f] box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shadow-[4px_4px_0px_0.05px_rgba(255,255,255,0.4)] shrink-0"
      data-name="Button-Codetopia"
    >
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.014px] whitespace-pre">
        JOIN OUR COMMUNITY
      </span>
    </a>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path clipRule="evenodd" d={svgPaths.p331f4a00} fill="var(--fill-0, #E9E9E9)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCodetopia1() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0.05px_#ffffff]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.014px] whitespace-pre">
        LEARN MORE
      </span>
      <ArrowRight />
    </a>
  );
}

function ButtonContainer() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="Button Container">
      <ButtonCodetopia />
      <ButtonCodetopia1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <Frame />
      <ButtonContainer />
    </div>
  );
}

function CardContainer() {
  return (
    <div className="content-stretch flex gap-[64px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Card Container">
      <div className="h-[33px] relative shrink-0 w-[126px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 126 33">
          <g id="Vector">
            <path d={svgPaths.p29871200} fill="#E9E9E9" />
            <path d={svgPaths.p25849200} fill="#E9E9E9" />
          </g>
        </svg>
      </div>
      <div className="relative shrink-0 size-[40px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <g id="Vector">
            <path d={svgPaths.p3fd0270} fill="var(--fill-0, #F06225)" />
            <path d={svgPaths.p26644e00} fill="var(--fill-0, #F06225)" />
          </g>
        </svg>
      </div>
      <div className="h-[26.666px] relative shrink-0 w-[135.646px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 136 27">
          <g id="Vector">
            <path d={svgPaths.p155e5880} fill="#E9E9E9" />
            <path d={svgPaths.p6034f00} fill="#E9E9E9" />
            <path d={svgPaths.p3966d000} fill="#E9E9E9" />
            <path d={svgPaths.p16207300} fill="#E9E9E9" />
            <path d={svgPaths.p181cc5c0} fill="#E9E9E9" />
            <path d={svgPaths.pf3ebf00} fill="#E9E9E9" />
            <path d={svgPaths.p306b7080} fill="#E9E9E9" />
            <path d={svgPaths.p2ad16680} fill="#E9E9E9" />
            <path d={svgPaths.p11c43900} fill="#E9E9E9" />
            <path d={svgPaths.p68fe700} fill="#E9E9E9" />
            <path d={svgPaths.p149ceb00} fill="#E9E9E9" />
            <path d={svgPaths.p25d6fc00} fill="#E9E9E9" />
            <path d={svgPaths.p1ef48e00} fill="#E9E9E9" />
          </g>
        </svg>
      </div>
      <div className="relative shrink-0 size-[40px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <g id="Vector">
            <path d={svgPaths.p3fd0270} fill="var(--fill-0, #F06225)" />
            <path d={svgPaths.p26644e00} fill="var(--fill-0, #F06225)" />
          </g>
        </svg>
      </div>
      <div className="h-[30px] relative shrink-0 w-[148px]" data-name="Logo">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 148 30">
          <g id="Logo">
            <path d="M0 0H14.898L0 15V0Z" fill="var(--fill-0, #C2CDD4)" />
            <path d="M14.898 15H0V30H14.898V15Z" fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p214c76c0} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p3026e170} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p2f93f6f0} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p1626e600} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p7626f00} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p11a89e00} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p32146200} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p201a6e80} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p10f31b00} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p2457e400} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p2ad99180} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p214c76c0} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p3026e170} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p2f93f6f0} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p1626e600} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p7626f00} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p11a89e00} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p32146200} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p201a6e80} fill="var(--fill-0, #C2CDD4)" />
            <path d={svgPaths.p10f31b00} fill="var(--fill-0, #C2CDD4)" />
          </g>
        </svg>
      </div>
      <div className="h-[33px] relative shrink-0 w-[126px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 126 33">
          <g id="Vector">
            <path d={svgPaths.p29871200} fill="#E9E9E9" />
            <path d={svgPaths.p25849200} fill="#E9E9E9" />
          </g>
        </svg>
      </div>
      <div className="h-[26.666px] relative shrink-0 w-[135.646px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 136 27">
          <g id="Vector">
            <path d={svgPaths.p155e5880} fill="#E9E9E9" />
            <path d={svgPaths.p6034f00} fill="#E9E9E9" />
            <path d={svgPaths.p3966d000} fill="#E9E9E9" />
            <path d={svgPaths.p16207300} fill="#E9E9E9" />
            <path d={svgPaths.p181cc5c0} fill="#E9E9E9" />
            <path d={svgPaths.pf3ebf00} fill="#E9E9E9" />
            <path d={svgPaths.p306b7080} fill="#E9E9E9" />
            <path d={svgPaths.p2ad16680} fill="#E9E9E9" />
            <path d={svgPaths.p11c43900} fill="#E9E9E9" />
            <path d={svgPaths.p68fe700} fill="#E9E9E9" />
            <path d={svgPaths.p149ceb00} fill="#E9E9E9" />
            <path d={svgPaths.p25d6fc00} fill="#E9E9E9" />
            <path d={svgPaths.p1ef48e00} fill="#E9E9E9" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function OurPatnersCollaborators() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Our Patners & Collaborators">
      <CardContainer />
    </div>
  );
}

function Frame14() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-center justify-between min-h-px min-w-px px-0 py-[96px] relative shrink-0">
      <Frame17 />
      <OurPatnersCollaborators />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="relative box-border flex w-screen max-w-[100vw] items-start justify-center overflow-hidden px-6 py-16 md:px-16 lg:px-[128px] min-h-screen"
      data-name="Hero Section"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute inset-0 h-full w-full max-w-none object-cover" src={heroBackground} />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[#000000]" />
      </div>
      <div className="relative z-10 flex w-full justify-center">
        <Frame14 />
      </div>
    </section>
  );
}

function Frame19() {
  return (
    <div className="relative w-screen max-w-[100vw] overflow-hidden">
      <HeroSection />
    </div>
  );
}

function Line() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Line">
      <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 241 4">
          <g id="Line">
            <line id="Line 6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="4" x1="50" x2="191" y1="2" y2="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Healine() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0" data-name="Healine">
      <p className="[text-shadow:rgba(255,255,255,0.2)_2px_1.5px_0px] font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[48px] relative shrink-0 text-[#e9e9e9] text-[32px] text-nowrap tracking-[-0.08px] whitespace-pre">WHAT WE OFFER</p>
      <Line />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
          <div className="relative shrink-0 size-[64px]" data-name="Today">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={eventsIcon} />
          </div>
          <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Events</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#474747] text-[16px] w-[min-content]">Weekly meetups, workshops, and hackathons for all skill levels.</p>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="basis-0 bg-[#e9e9e9] grow min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(255,255,255,0.4)]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
          <div className="relative shrink-0 size-[64px]" data-name="Web Design">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={articlesIcon} />
          </div>
          <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Tech Articles</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#474747] text-[16px] w-[min-content]">Community-written articles on latest technologies and best practices.</p>
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="basis-0 bg-[#e9e9e9] grow min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(255,255,255,0.4)]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
          <div className="relative shrink-0 size-[64px]" data-name="Crowd">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={communityIcon} />
          </div>
          <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Active Community</p>
          <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#474747] text-[16px] w-[min-content]">
            <p className="mb-0">{`Connect with like-minded individuals `}</p>
            <p>and grow your network.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="basis-0 bg-[#e9e9e9] grow min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(255,255,255,0.4)]" />
    </div>
  );
}

function CardContainer1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Card Container">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Navbar1() {
  return (
    <div className="bg-[#1f1f1f] h-[624px] relative shrink-0 w-full" data-name="Navbar">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] h-[624px] items-center justify-center px-[128px] py-[96px] relative w-full">
          <div className="absolute h-[758px] left-[-611px] top-[-67px] w-[1348px]" data-name="Codetopia-Logo-TW 2">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-10 pointer-events-none size-full" src={logoWordmark} />
          </div>
          <div className="absolute h-[741px] left-[836px] top-[-82px] w-[1318px]" data-name="Codetopia-Logo-TW 3">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-10 pointer-events-none size-full" src={logoWordmark} />
          </div>
          <Healine />
          <CardContainer1 />
        </div>
      </div>
    </div>
  );
}

function Line1() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Line">
      <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 409 4">
          <g id="Line">
            <line id="Line 6" stroke="var(--stroke-0, #161616)" strokeLinecap="round" strokeWidth="4" x1="50" x2="359" y1="2" y2="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Headline() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0" data-name="Headline">
      <p className="[text-shadow:rgba(0,0,0,0.2)_1px_0.5px_0px] font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[48px] relative shrink-0 text-[#161616] text-[32px] text-nowrap tracking-[-0.08px] whitespace-pre">OUR GROWING COMMUNITY</p>
      <Line1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Headline />
      <div className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#474747] text-[16px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">{`A thriving tech community where developers, designers, and tech enthusiats come together to `}</p>
        <p>learn, share, and grow</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow h-full items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="absolute left-[131px] size-[24px] top-[112px]" data-name="User" />
      <div className="absolute left-[37px] size-[56px] top-[205px]" data-name="User" />
      <div className="absolute left-[175px] size-[36px] top-[215px]" data-name="User" />
      <div className="absolute left-[164px] size-[58px] top-[118px]" data-name="User" />
      <div className="absolute left-[22px] size-[68px] top-[100px]" data-name="User" />
      <div className="absolute left-[44px] size-[24px] top-[44px]" data-name="User" />
      <div className="shrink-0 size-[40px]" data-name="User" />
      <div className="absolute left-[128px] size-[38px] top-[49px]" data-name="User" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 text-nowrap whitespace-pre">
      <p className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[44px] relative shrink-0 text-[#e9e9e9] text-[36px]">100+</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[12px]">{`Active developers & designers`}</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow h-full items-center justify-end min-h-px min-w-px px-0 py-[48px] relative shrink-0" data-name="Container">
      <Frame2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 content-stretch flex gap-[32px] grow h-full items-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#1f1f1f] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={statsBackgroundLeft} />
        <div className="absolute inset-0" />
      </div>
      <div aria-hidden="true" className="absolute border border-[#727272] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]" />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow h-full items-center justify-center min-h-px min-w-px opacity-0 relative shrink-0" data-name="Container">
      <div className="absolute left-[31px] size-[32px] top-[30px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[80px] size-[20px] top-[62px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[84px] size-[16px] top-[124px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[102px] size-[16px] top-[26px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[27px] size-[36px] top-[93px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[102px] size-[50px] top-[74px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[169px] size-[38px] top-[74px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[207px] size-[18px] top-[124px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[196px] size-[38px] top-[27px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[132px] size-[26px] top-[39px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[44px] relative shrink-0 text-[#e9e9e9] text-[36px] text-nowrap whitespace-pre">10+</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow h-full items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#e9e9e9] text-[12px] text-center w-[104px]">{`Workshop & meetups hosted`}</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[164px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#1f1f1f] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={statsBackgroundRight} />
        <div className="absolute inset-0" />
      </div>
      <div className="content-stretch flex h-[164px] items-center justify-center overflow-clip relative rounded-[inherit] w-full">
        <Container6 />
        <Container7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#727272] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow h-full items-center justify-center min-h-px min-w-px opacity-0 relative shrink-0" data-name="Container">
      <div className="absolute left-[31px] size-[32px] top-[30px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[80px] size-[20px] top-[62px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[84px] size-[16px] top-[124px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[102px] size-[16px] top-[26px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[27px] size-[36px] top-[93px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[102px] size-[50px] top-[74px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[169px] size-[38px] top-[74px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[207px] size-[18px] top-[124px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[196px] size-[38px] top-[27px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
      <div className="absolute left-[132px] size-[26px] top-[39px]" data-name="Today">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={accentDots} />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
      <p className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[44px] relative shrink-0 text-[#e9e9e9] text-[36px] text-nowrap whitespace-pre">13+</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow h-full items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Frame4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#e9e9e9] text-[12px] text-center w-[104px]">{`Workshop & meetups hosted`}</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[164px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#1f1f1f] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={statsBackgroundRight} />
        <div className="absolute inset-0" />
      </div>
      <div className="content-stretch flex h-[164px] items-center justify-center overflow-clip relative rounded-[inherit] w-full">
        <Container9 />
        <Container10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#727272] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow h-[352px] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container8 />
      <Container11 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Container5 />
      </div>
      <Container12 />
    </div>
  );
}

function Navbar2() {
  return (
    <div className="bg-[#e9e9e9] relative shrink-0 w-full" data-name="Navbar">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-center px-[128px] py-[96px] relative w-full">
          <Frame1 />
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function Line2() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Line">
      <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 422 4">
          <g id="Line">
            <line id="Line 6" stroke="var(--stroke-0, #161616)" strokeLinecap="round" strokeWidth="4" x1="50" x2="372" y1="2" y2="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Headline1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0" data-name="Headline">
      <p className="[text-shadow:rgba(0,0,0,0.2)_1px_0.5px_0px] font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[48px] relative shrink-0 text-[#161616] text-[32px] text-nowrap tracking-[-0.08px] whitespace-pre">{`COMMUNITY & TECH EVENTS`}</p>
      <Line2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Headline1 />
      <div className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#474747] text-[16px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">{`A thriving tech community where developers, designers, and tech enthusiats come together to `}</p>
        <p>learn, share, and grow</p>
      </div>
    </div>
  );
}

function PastEvent() {
  return (
    <div className="absolute bg-[#1f1f1f] box-border content-stretch flex flex-col gap-[2px] items-center justify-center left-0 p-[8px] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] top-0" data-name="Past Event">
      <p className="font-['Archivo:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#e9e9e9] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Past Event
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#161616] box-border content-stretch flex flex-col gap-[2px] items-center justify-center p-[8px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]" />
      <p className="font-['Archivo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#f3f3f3] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        12
      </p>
      <p className="font-['Archivo:Light',sans-serif] font-light leading-[16px] relative shrink-0 text-[#f3f3f3] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Aug 2025
      </p>
    </div>
  );
}

function Date() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-start justify-end left-[47px] top-[16px] w-[316px]" data-name="Date">
      <Frame5 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#b2b2b2] content-stretch flex gap-[10px] h-[180px] items-start overflow-clip relative shrink-0 w-full">
      <div className="aspect-[1064/808] basis-0 grow min-h-px min-w-px relative shrink-0" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={eventPhotoPrimary} />
      </div>
      <PastEvent />
      <Date />
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 1">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Front-End Web</p>
    </div>
  );
}

function Tag1() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Git</p>
    </div>
  );
}

function Tag2() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 3">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Github</p>
    </div>
  );
}

function Tag3() {
  return (
    <div className="bg-[#e9e9e9] box-border content-center flex flex-wrap gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 4">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">VS code</p>
    </div>
  );
}

function Tags() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Tags">
      <Tag />
      <Tag1 />
      <Tag2 />
      <Tag3 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[154px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Event Name</p>
      <Tags />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#101828] text-[14px] w-[min-content]">Some details of the Event that is upcoming. You should some details here!!!</p>
    </div>
  );
}

function ButtonCodetopia2() {
  return (
    <a
      href="#"
      className="bg-white box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-[-1px] pointer-events-none shadow-[4px_4px_0px_0.05px_rgba(0,0,0,0.2)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1a1a1a] text-[12px] text-nowrap tracking-[0.048px] whitespace-pre">
        VIEW EVENT
      </span>
    </a>
  );
}

function Cotainer() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Cotainer">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <div className="absolute h-[128px] left-[206px] opacity-10 top-1/2 translate-y-[-50%] w-[227px]" data-name="Codetopia-Logo-TB">
            <img alt="" className="block max-w-none size-full" height="128" src={logoMark} width="227" />
          </div>
          <Container14 />
          <ButtonCodetopia2 />
        </div>
      </div>
    </div>
  );
}

function EventCard() {
  return (
    <div className="basis-0 bg-[#d9d9d9] grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Event Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame13 />
        <Cotainer />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function PastEvent1() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex flex-col gap-[2px] items-center justify-center left-0 p-[8px] top-0" data-name="Past Event">
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0px_#007a55]" />
      <p className="font-['Archivo:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#007a55] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Upcoming Event
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#161616] box-border content-stretch flex flex-col gap-[2px] items-center justify-center p-[8px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]" />
      <p className="font-['Archivo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#f3f3f3] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        12
      </p>
      <p className="font-['Archivo:Light',sans-serif] font-light leading-[16px] relative shrink-0 text-[#f3f3f3] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Aug 2025
      </p>
    </div>
  );
}

function Date1() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-start justify-end left-[47px] top-[16px] w-[316px]" data-name="Date">
      <Frame10 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#b2b2b2] content-stretch flex gap-[10px] h-[180px] items-start overflow-clip relative shrink-0 w-full">
      <div className="aspect-[1064/808] basis-0 grow min-h-px min-w-px relative shrink-0" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={eventPhotoSecondary} />
      </div>
      <PastEvent1 />
      <Date1 />
    </div>
  );
}

function Tag6() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 1">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Front-End Web</p>
    </div>
  );
}

function Tag7() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Git</p>
    </div>
  );
}

function Tag8() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 3">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Github</p>
    </div>
  );
}

function Tag9() {
  return (
    <div className="bg-[#e9e9e9] box-border content-center flex flex-wrap gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 4">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">VS code</p>
    </div>
  );
}

function Tag4() {
  return (
    <div className="bg-[#e9e9e9] box-border content-center flex flex-wrap gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 5">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Cereboro</p>
    </div>
  );
}

function Tag5() {
  return (
    <div className="bg-[#e9e9e9] box-border content-center flex flex-wrap gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 6">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Cypherios</p>
    </div>
  );
}

function Tags1() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Tags">
      <Tag6 />
      <Tag7 />
      <Tag8 />
      <Tag9 />
      <Tag4 />
      <Tag5 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Event Name</p>
      <Tags1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#101828] text-[14px] w-[min-content]">Some details of the Event that is upcoming. You should some details here!!!</p>
    </div>
  );
}

function ButtonCodetopia3() {
  return (
    <a
      href="#"
      className="bg-white box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-[-1px] pointer-events-none shadow-[4px_4px_0px_0.05px_rgba(0,0,0,0.2)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1a1a1a] text-[12px] text-nowrap tracking-[0.048px] whitespace-pre">
        JOIN EVENT
      </span>
    </a>
  );
}

function Cotainer1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Cotainer">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <div className="absolute h-[128px] left-[206px] opacity-10 top-1/2 translate-y-[-50%] w-[227px]" data-name="Codetopia-Logo-TB">
            <img alt="" className="block max-w-none size-full" height="128" src={logoMark} width="227" />
          </div>
          <Container15 />
          <ButtonCodetopia3 />
        </div>
      </div>
    </div>
  );
}

function EventCard1() {
  return (
    <div className="basis-0 bg-[#d9d9d9] grow min-h-px min-w-px relative shrink-0" data-name="Event Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame15 />
        <Cotainer1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PastEvent2() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex flex-col gap-[2px] items-center justify-center left-0 p-[8px] top-0" data-name="Past Event">
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0px_#007a55]" />
      <p className="font-['Archivo:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#007a55] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Upcoming Event
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#161616] box-border content-stretch flex flex-col gap-[2px] items-center justify-center p-[8px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]" />
      <p className="font-['Archivo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#f3f3f3] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        12
      </p>
      <p className="font-['Archivo:Light',sans-serif] font-light leading-[16px] relative shrink-0 text-[#f3f3f3] text-[12px] text-nowrap tracking-[0.06px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Aug 2025
      </p>
    </div>
  );
}

function Date2() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-start justify-end left-[47px] top-[16px] w-[316px]" data-name="Date">
      <Frame6 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#b2b2b2] content-stretch flex gap-[10px] h-[180px] items-start overflow-clip relative shrink-0 w-full">
      <div className="aspect-[1170/780] basis-0 grow min-h-px min-w-px relative shrink-0" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={eventPhotoTertiary} />
      </div>
      <PastEvent2 />
      <Date2 />
    </div>
  );
}

function Tag10() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 1">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Front-End Web</p>
    </div>
  );
}

function Tag11() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Git</p>
    </div>
  );
}

function Tag12() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 3">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Github</p>
    </div>
  );
}

function Tag13() {
  return (
    <div className="bg-[#e9e9e9] box-border content-center flex flex-wrap gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 4">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">VS code</p>
    </div>
  );
}

function Tags2() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Tags">
      <Tag10 />
      <Tag11 />
      <Tag12 />
      <Tag13 />
    </div>
  );
}

function Container16() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Event Name</p>
      <Tags2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#101828] text-[14px] w-[min-content]">Some details of the Event that is upcoming. You should some details here!!!</p>
    </div>
  );
}

function ButtonCodetopia4() {
  return (
    <a
      href="#"
      className="bg-white box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-[-1px] pointer-events-none shadow-[4px_4px_0px_0.05px_rgba(0,0,0,0.2)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1a1a1a] text-[12px] text-nowrap tracking-[0.048px] whitespace-pre">
        JOIN EVENT
      </span>
    </a>
  );
}

function Cotainer2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full" data-name="Cotainer">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <div className="absolute h-[128px] left-[206px] opacity-10 top-1/2 translate-y-[-50%] w-[227px]" data-name="Codetopia-Logo-TB">
            <img alt="" className="block max-w-none size-full" height="128" src={logoMark} width="227" />
          </div>
          <Container16 />
          <ButtonCodetopia4 />
        </div>
      </div>
    </div>
  );
}

function EventCard2() {
  return (
    <div className="basis-0 bg-[#d9d9d9] grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Event Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame16 />
        <Cotainer2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function EventContainer() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Event Container">
      <EventCard />
      <EventCard1 />
      <EventCard2 />
    </div>
  );
}

function ButtonCodetopia5() {
  return (
    <a
      href="#"
      className="bg-[#1f1f1f] box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shadow-[4px_4px_0px_0.05px_rgba(0,0,0,0.2)] shrink-0"
      data-name="Button-Codetopia"
    >
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.035px] whitespace-pre">
        VIEW ALL EVENTS
      </span>
    </a>
  );
}

function ButoonContainer() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Butoon Container">
      <ButtonCodetopia5 />
    </div>
  );
}

function Navbar3() {
  return (
    <div className="bg-[#e9e9e9] relative shrink-0 w-full" data-name="Navbar">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-center px-[128px] py-[64px] relative w-full">
          <Container13 />
          <EventContainer />
          <ButoonContainer />
        </div>
      </div>
    </div>
  );
}

function Line3() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Line">
      <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 258 4">
          <g id="Line">
            <line id="Line 6" stroke="var(--stroke-0, #E9E9E9)" strokeLinecap="round" strokeWidth="4" x1="50" x2="208" y1="2" y2="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Headlone() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative shrink-0 w-[258px]" data-name="Headlone">
      <p className="[text-shadow:rgba(255,255,255,0.2)_2px_1.5px_0px] font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[48px] relative shrink-0 text-[#e9e9e9] text-[32px] text-nowrap tracking-[-0.08px] whitespace-pre">LATEST ARTICLES</p>
      <Line3 />
    </div>
  );
}

function HeadingContainer() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0 w-full" data-name="Heading Container">
      <Headlone />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[180px] relative shrink-0 w-full" data-name="Icon">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#b2b2b2] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={articleCoverOne} />
      </div>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="h-[180px] w-full" />
      </div>
    </div>
  );
}

function Tag14() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 1">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Front-End</p>
    </div>
  );
}

function BookOpen() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="book-open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="book-open">
          <path clipRule="evenodd" d={svgPaths.p256fc480} fill="var(--fill-0, #727272)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArticleReadTime() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Article read time">
      <BookOpen />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#727272] text-[14px] text-nowrap whitespace-pre">7 min read</p>
    </div>
  );
}

function Date3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Date">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#727272] text-[14px] text-nowrap whitespace-pre">March 10, 2025</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#1f1f1f] text-[14px] text-nowrap whitespace-pre">John Doe</p>
      <Date3 />
    </div>
  );
}

function AuthorDate() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Author & Date">
      <div className="relative shrink-0 size-[32px]" data-name="Avatar">
        <img alt="" className="block max-w-none size-full" height="32" src={authorAvatar} width="32" />
      </div>
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Getting Started with HTML</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#1f1f1f] text-[16px] w-[min-content]">All you need to know about HTML and web design with HTML</p>
      <AuthorDate />
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path clipRule="evenodd" d={svgPaths.p331f4a00} fill="var(--fill-0, #1F1F1F)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCodetopia6() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0.05px_rgba(0,0,0,0.4)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1f1f1f] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        READ ARTICLE
      </span>
      <ArrowRight1 />
    </a>
  );
}

function Container19() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[16px] py-[24px] relative w-full">
          <Tag14 />
          <ArticleReadTime />
          <Container18 />
          <ButtonCodetopia6 />
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="basis-0 bg-[#d9d9d9] grow min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Icon />
        <Container19 />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[180px] relative shrink-0 w-full" data-name="Icon">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#b2b2b2] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={articleCoverTwo} />
      </div>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="h-[180px] w-full" />
      </div>
    </div>
  );
}

function Tag15() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 1">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Front-End</p>
    </div>
  );
}

function Tag16() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">CLI</p>
    </div>
  );
}

function Tag17() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 3">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">CI/CD</p>
    </div>
  );
}

function Tag18() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 4">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">UI/UX</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Tag15 />
      <Tag16 />
      <Tag17 />
      <Tag18 />
    </div>
  );
}

function BookOpen1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="book-open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="book-open">
          <path clipRule="evenodd" d={svgPaths.p256fc480} fill="var(--fill-0, #727272)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArticleReadTime1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Article read time">
      <BookOpen1 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#727272] text-[14px] text-nowrap whitespace-pre">7 min read</p>
    </div>
  );
}

function Date4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Date">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#727272] text-[14px] text-nowrap whitespace-pre">March 10, 2025</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#1f1f1f] text-[14px] text-nowrap whitespace-pre">John Doe</p>
      <Date4 />
    </div>
  );
}

function AuthorDate1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Author & Date">
      <div className="relative shrink-0 size-[32px]" data-name="Avatar">
        <img alt="" className="block max-w-none size-full" height="32" src={authorAvatar} width="32" />
      </div>
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Getting Started with HTML</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#1f1f1f] text-[16px] w-[min-content]">All you need to know about HTML and web design with HTML</p>
      <AuthorDate1 />
    </div>
  );
}

function ArrowRight2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path clipRule="evenodd" d={svgPaths.p331f4a00} fill="var(--fill-0, #1F1F1F)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCodetopia7() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0.05px_rgba(0,0,0,0.4)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1f1f1f] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        READ ARTICLE
      </span>
      <ArrowRight2 />
    </a>
  );
}

function Container23() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[16px] py-[24px] relative w-full">
          <Container20 />
          <ArticleReadTime1 />
          <Container22 />
          <ButtonCodetopia7 />
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="basis-0 bg-[#d9d9d9] grow min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Icon1 />
        <Container23 />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[180px] relative shrink-0 w-full" data-name="Icon">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#b2b2b2] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={articleCoverThree} />
      </div>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="h-[180px] w-full" />
      </div>
    </div>
  );
}

function Tag19() {
  return (
    <div className="bg-[#e9e9e9] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] shrink-0" data-name="Tag 1">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#101828] text-[12px] text-nowrap whitespace-pre">Front-End</p>
    </div>
  );
}

function BookOpen2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="book-open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="book-open">
          <path clipRule="evenodd" d={svgPaths.p256fc480} fill="var(--fill-0, #727272)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArticleReadTime2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Article read time">
      <BookOpen2 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#727272] text-[14px] text-nowrap whitespace-pre">7 min read</p>
    </div>
  );
}

function Date5() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Date">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#727272] text-[14px] text-nowrap whitespace-pre">March 10, 2025</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#1f1f1f] text-[14px] text-nowrap whitespace-pre">John Doe</p>
      <Date5 />
    </div>
  );
}

function AuthorDate2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Author & Date">
      <div className="relative shrink-0 size-[32px]" data-name="Avatar">
        <img alt="" className="block max-w-none size-full" height="32" src={authorAvatar} width="32" />
      </div>
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[22px] text-nowrap whitespace-pre">Getting Started with HTML</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#1f1f1f] text-[16px] w-[min-content]">All you need to know about HTML and web design with HTML</p>
      <AuthorDate2 />
    </div>
  );
}

function ArrowRight3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path clipRule="evenodd" d={svgPaths.p331f4a00} fill="var(--fill-0, #1F1F1F)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCodetopia8() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0.05px_rgba(0,0,0,0.4)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1f1f1f] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        READ ARTICLE
      </span>
      <ArrowRight3 />
    </a>
  );
}

function Container26() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[16px] py-[24px] relative w-full">
          <Tag19 />
          <ArticleReadTime2 />
          <Container25 />
          <ButtonCodetopia8 />
        </div>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="basis-0 bg-[#d9d9d9] grow min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Icon2 />
        <Container26 />
      </div>
      <div aria-hidden="true" className="absolute border-[#767676] border-[0.5px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CardContainer2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Card Container">
      <Card3 />
      <Card4 />
      <Card5 />
    </div>
  );
}

function ArrowRight4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path clipRule="evenodd" d={svgPaths.p331f4a00} fill="var(--fill-0, #E9E9E9)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCodetopia9() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0.05px_#ffffff]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.014px] whitespace-pre">
        VIEW ALL ARTICLES
      </span>
      <ArrowRight4 />
    </a>
  );
}

function ButoonContainer1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Butoon Container">
      <ButtonCodetopia9 />
    </div>
  );
}

function Navbar4() {
  return (
    <div className="bg-[#1f1f1f] relative shrink-0 w-full" data-name="Navbar">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[48px] items-center px-[128px] py-[96px] relative w-full">
          <div className="absolute h-[758px] left-[-606px] top-1/2 translate-y-[-50%] w-[1348px]" data-name="Codetopia-Logo-TW 2">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-10 pointer-events-none size-full" src={logoWordmark} />
          </div>
          <div className="absolute h-[741px] left-[850px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[1318px]" data-name="Codetopia-Logo-TW 3">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-10 pointer-events-none size-full" src={logoWordmark} />
          </div>
          <HeadingContainer />
          <CardContainer2 />
          <ButoonContainer1 />
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0" data-name="Container">
      <p className="[text-shadow:rgba(255,255,255,0.2)_2px_1.5px_0px] font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[48px] relative shrink-0 text-[#e9e9e9] text-[32px] text-nowrap tracking-[-0.08px] whitespace-pre">CODETOPIA NEWSLETTERS</p>
      <p className="font-['Archivo:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#c9c9c9] text-[22px] text-center w-[630px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Subscribe to our newsletter to get updates on upcoming events, new articles, and community announcements delivered straight to your inbox.
      </p>
    </div>
  );
}

function EmailField() {
  return (
    <div className="bg-neutral-100 relative shrink-0 w-[280px]" data-name="Email field">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        placeholder="Enter your email address"
        className="box-border w-[280px] rounded-[inherit] bg-transparent px-[10px] py-[10px] font-['Inter:Regular',sans-serif] text-[14px] leading-[14px] text-[#767676] outline-none"
      />
      <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ButtonCodetopia10() {
  return (
    <button
      type="submit"
      className="box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[8px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0.05px_rgba(255,255,255,0.4)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.014px] whitespace-pre">
        SUSCRIBE
      </span>
    </button>
  );
}

function Frame7() {
  return (
    <form
      className="content-stretch flex gap-[10px] items-center relative shrink-0"
      onSubmit={(event) => event.preventDefault()}
    >
      <EmailField />
      <ButtonCodetopia10 />
    </form>
  );
}

function Container28() {
  return (
    <div className="bg-[#1f1f1f] box-border content-stretch flex flex-col gap-[24px] items-center justify-center px-0 py-[32px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Frame7 />
    </div>
  );
}

function Navbar5() {
  return (
    <div className="bg-[#e9e9e9] relative shrink-0 w-full" data-name="Navbar">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-center px-[192px] py-[64px] relative w-full">
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function HeadingContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full" data-name="Heading Container">
      <p className="[text-shadow:rgba(0,0,0,0.35)_1px_1px_0px] font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[48px] relative shrink-0 text-[#f2f2f2] text-[32px] text-nowrap tracking-[-0.08px] whitespace-pre">READY TO TO JOIN OUR COMMUNITY</p>
      <p className="font-['Archivo:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#c7c7c7] text-[22px] text-center w-[754px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Whether you're a beginner or an experienced developer, there's a place for you in Codetopia Community. Start your journey today!`}</p>
    </div>
  );
}

function ButtonCodetopia11() {
  return (
    <a
      href="#"
      className="bg-[#f5f5f5] box-border content-stretch flex gap-[6px] items-center justify-center px-[16px] py-[10px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0px_rgba(96,96,96,0.35)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1f1f1f] text-[14px] text-nowrap tracking-[0.014px] whitespace-pre">
        JOIN OUR COMMUNITY
      </span>
    </a>
  );
}

function ButtonCodetopia12() {
  return (
    <a
      href="#"
      className="box-border content-stretch flex gap-[6px] items-center justify-center px-[16px] py-[10px] relative shrink-0"
      data-name="Button-Codetopia"
    >
      <div aria-hidden="true" className="absolute border border-[#9a9a9a] border-solid inset-0 pointer-events-none shadow-[4px_4px_0px_0px_rgba(96,96,96,0.35)]" />
      <span className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-[#f2f2f2] tracking-[0.014px] whitespace-pre">
        LEARN MORE
      </span>
    </a>
  );
}

function ButoonContainer2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Butoon Container">
      <ButtonCodetopia11 />
      <ButtonCodetopia12 />
    </div>
  );
}

function Navbar6() {
  return (
    <div
      className="relative shrink-0 w-full bg-[#0e0e0e]"
      data-name="Navbar"
      style={{
        background:
          "linear-gradient(0deg, #0E0E0E, #0E0E0E), radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.2) 100%)",
      }}
    >
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center px-[128px] py-[64px] relative w-full">
          <HeadingContainer1 />
          <ButoonContainer2 />
        </div>
      </div>
    </div>
  );
}

function Discord() {
  return (
    <a href="#" aria-label="Discord" className="relative shrink-0 size-[24px]" data-name="discord">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="discord">
          <path d={svgPaths.p113ad00} fill="var(--fill-0, #E9E9E9)" id="Vector" />
        </g>
      </svg>
    </a>
  );
}

function Youtube() {
  return (
    <a href="#" aria-label="YouTube" className="relative shrink-0 size-[24px]" data-name="youtube">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="youtube">
          <path clipRule="evenodd" d={svgPaths.pf1aaa80} fill="var(--fill-0, #E9E9E9)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </a>
  );
}

function Linkedin() {
  return (
    <a href="#" aria-label="LinkedIn" className="relative shrink-0 size-[24px]" data-name="linkedin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="linkedin">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.pad3e800} fill="var(--fill-0, #E9E9E9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p11af9480} fill="var(--fill-0, #E9E9E9)" fillRule="evenodd" />
            <path d="M6 7.1702H2V20H6V7.1702Z" fill="var(--fill-0, #E9E9E9)" />
          </g>
        </g>
      </svg>
    </a>
  );
}

function X() {
  return (
    <a href="#" aria-label="X" className="relative shrink-0 size-[24px]" data-name="X">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="X">
          <path d={svgPaths.pad92580} fill="var(--fill-0, #E9E9E9)" id="Vector" />
        </g>
      </svg>
    </a>
  );
}

function RiBlueskyFill() {
  return (
    <a href="#" aria-label="Bluesky" className="relative shrink-0 size-[24px]" data-name="ri:bluesky-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ri:bluesky-fill">
          <path d={svgPaths.p32de100} fill="var(--fill-0, #E9E9E9)" id="Vector" />
        </g>
      </svg>
    </a>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_14.17%_0.77%_13.09%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
        <g id="Group">
          <g id="Vector"></g>
          <path clipRule="evenodd" d={svgPaths.p3b8de6f0} fill="var(--fill-0, #E9E9E9)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteThreadsLine() {
  return (
    <a href="#" aria-label="Threads" className="overflow-clip relative shrink-0 size-[24px]" data-name="mingcute:threads-line">
      <Group />
    </a>
  );
}

function Fa6BrandsTiktok() {
  return (
    <a href="#" aria-label="TikTok" className="h-[24px] relative shrink-0 w-[21px]" data-name="fa6-brands:tiktok">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 24">
        <g clipPath="url(#clip0_1_7904)" id="fa6-brands:tiktok">
          <path d={svgPaths.p25bb6300} fill="var(--fill-0, #E9E9E9)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_7904">
            <rect fill="white" height="24" width="21" />
          </clipPath>
        </defs>
      </svg>
    </a>
  );
}

function SocialMediaContainer() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Social Media Container">
      <Discord />
      <Youtube />
      <Linkedin />
      <X />
      <RiBlueskyFill />
      <MingcuteThreadsLine />
      <Fa6BrandsTiktok />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Container">
      <div className="h-[72px] relative shrink-0 w-[150px]" data-name="Codetopia-Logo-TW 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={logoWordmark} />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#c9c9c9] text-[16px] w-[min-content]">{` A utopia for tech enthusiasts`}</p>
      <SocialMediaContainer />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0">
      <Container29 />
    </div>
  );
}

function Frame8() {
  return (
    <a
      href="#"
      className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0"
    >
      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">
        Become a Volunteer
      </span>
    </a>
  );
}

function Links() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Links">
      <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">
        Code of Conduct
      </a>
      <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">
        Become a Sponsor
      </a>
      <Frame8 />
      <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-nowrap whitespace-pre">
        Join Our Discord Server
      </a>
      <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-nowrap whitespace-pre">
        Join Our WhatsApp Community
      </a>
    </div>
  );
}

function NavLinksContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0" data-name="Nav Links Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#e9e9e9] text-[16px] text-center text-nowrap tracking-[0.024px] whitespace-pre">Community</p>
      <Links />
    </div>
  );
}

function Envelope() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="envelope">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="envelope">
          <path clipRule="evenodd" d={svgPaths.pb27cb00} fill="var(--fill-0, #C9C9C9)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Email() {
  return (
    <a href="#" className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Email">
      <Envelope />
      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-nowrap whitespace-pre">hello@codetopia.com</span>
    </a>
  );
}

function MapPinAlt() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="map-pin-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="map-pin-alt">
          <path clipRule="evenodd" d={svgPaths.p33c3fe80} fill="var(--fill-0, #C9C9C9)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Location() {
  return (
    <a href="#" className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Location">
      <MapPinAlt />
      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-nowrap whitespace-pre">123 Tech Street, Innovation District</span>
    </a>
  );
}

function Phone() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="phone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="phone">
          <path clipRule="evenodd" d={svgPaths.p305311f0} fill="var(--fill-0, #C9C9C9)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <a href="#" className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <Phone />
      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-nowrap whitespace-pre">(233) 55 555 5555</span>
    </a>
  );
}

function Phone1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Phone">
      <Frame11 />
    </div>
  );
}

function MainContactContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Main Contact Container">
      <Email />
      <Location />
      <Phone1 />
    </div>
  );
}

function Links1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Links">
      <MainContactContainer />
    </div>
  );
}

function NavLinksContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0" data-name="Nav Links Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#e9e9e9] text-[16px] text-center text-nowrap tracking-[0.024px] whitespace-pre">Contact</p>
      <Links1 />
    </div>
  );
}

function Frame12() {
  return (
    <a
      href="#"
      className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0"
    >
      <span className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">
        Articles
      </span>
    </a>
  );
}

function Links2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Links">
      <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">
        About Us
      </a>
      <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">
        Events
      </a>
      <Frame12 />
      <a href="#" className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">
        Gallery
      </a>
    </div>
  );
}

function NavLinksContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0" data-name="Nav Links Container">
      <p className="font-['Space_Grotesk:Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#e9e9e9] text-[16px] text-center text-nowrap tracking-[0.024px] whitespace-pre">Quick Links</p>
      <Links2 />
    </div>
  );
}

function NavLinksContainer3() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0" data-name="Nav Links  Container">
      <NavLinksContainer />
      <NavLinksContainer1 />
      <NavLinksContainer2 />
    </div>
  );
}

function Container30() {
  return (
    <div className="box-border content-stretch flex items-start justify-between pb-[32px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#767676] border-[0px_0px_0.5px] border-solid inset-0 pointer-events-none" />
      <Frame9 />
      <NavLinksContainer3 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[32px] items-center justify-center leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre" data-name="Container">
      <p className="relative shrink-0">Privacy Policy</p>
      <p className="relative shrink-0">Terms of Service</p>
      <p className="relative shrink-0">Cookies Policy</p>
    </div>
  );
}

function FooterContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Footer Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#c9c9c9] text-[14px] text-center text-nowrap whitespace-pre">© 2025 Codetopia Community. All rights reserved</p>
      <Container31 />
    </div>
  );
}

function Navbar7() {
  return (
    <div className="bg-[#1f1f1f] relative shrink-0 w-full" data-name="Navbar">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-center px-[128px] py-[32px] relative w-full">
          <div className="absolute h-[576px] left-[-464px] top-[calc(50%-20px)] translate-y-[-50%] w-[1024px]" data-name="Codetopia-Logo-TW 3">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-10 pointer-events-none size-full" src={logoWordmark} />
          </div>
          <div className="absolute h-[576px] left-[976px] top-[calc(50%-20px)] translate-y-[-50%] w-[1024px]" data-name="Codetopia-Logo-TW 4">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-10 pointer-events-none size-full" src={logoWordmark} />
          </div>
          <Container30 />
          <FooterContainer />
        </div>
      </div>
    </div>
  );
}

export default function HomePageV() {
  return (
    <div
      className="bg-gray-200 content-stretch flex w-screen max-w-[100vw] flex-col items-start overflow-x-hidden relative"
      data-name="Home Page V2"
    >
      <Navbar />
      <Frame19 />
      <Navbar1 />
      <Navbar2 />
      <Navbar3 />
      <Navbar4 />
      <Navbar5 />
      <Navbar6 />
      <Navbar7 />
    </div>
  );
}
