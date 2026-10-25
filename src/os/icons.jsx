// Pixel-style icons for AtifOS, drawn on a 32x32 grid (chrome glyphs on 8x8).
// Original artwork, so nothing from the reference site's assets is reused.

const Px = ({ size = 32, children, ...rest }) => (
  <svg
    viewBox={`0 0 ${size} ${size}`}
    shapeRendering="crispEdges"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

const ComputerIcon = (props) => (
  <Px {...props}>
    <rect x="4" y="3" width="24" height="18" fill="#c3c6ca" />
    <rect x="4" y="3" width="24" height="1" fill="#fff" />
    <rect x="4" y="3" width="1" height="18" fill="#fff" />
    <rect x="27" y="3" width="1" height="18" fill="#000" />
    <rect x="4" y="20" width="24" height="1" fill="#000" />
    <rect x="7" y="6" width="18" height="12" fill="#000" />
    <rect x="8" y="7" width="16" height="10" fill="#3e9697" />
    <rect x="9" y="8" width="5" height="1" fill="#fff" />
    <rect x="12" y="21" width="8" height="3" fill="#86898d" />
    <rect x="6" y="24" width="20" height="5" fill="#c3c6ca" />
    <rect x="6" y="24" width="20" height="1" fill="#fff" />
    <rect x="6" y="28" width="20" height="1" fill="#000" />
    <rect x="20" y="26" width="4" height="1" fill="#0a0" />
  </Px>
);

const ShowcaseIcon = (props) => (
  <Px {...props}>
    <rect x="2" y="4" width="28" height="23" fill="#000" />
    <rect x="3" y="5" width="26" height="21" fill="#fff" />
    <rect x="3" y="5" width="26" height="4" fill="#0000a3" />
    <rect x="25" y="6" width="3" height="2" fill="#c3c6ca" />
    <rect x="5" y="11" width="7" height="13" fill="#c3c6ca" />
    <rect x="6" y="13" width="5" height="1" fill="#0000ee" />
    <rect x="6" y="16" width="5" height="1" fill="#0000ee" />
    <rect x="6" y="19" width="5" height="1" fill="#0000ee" />
    <rect x="14" y="11" width="13" height="3" fill="#000" />
    <rect x="14" y="16" width="13" height="1" fill="#86898d" />
    <rect x="14" y="18" width="11" height="1" fill="#86898d" />
    <rect x="14" y="20" width="13" height="1" fill="#86898d" />
    <rect x="14" y="22" width="8" height="1" fill="#86898d" />
  </Px>
);

const DocumentIcon = (props) => (
  <Px {...props}>
    <rect x="6" y="2" width="16" height="28" fill="#000" />
    <rect x="22" y="8" width="4" height="22" fill="#000" />
    <rect x="7" y="3" width="14" height="26" fill="#fff" />
    <rect x="21" y="9" width="4" height="20" fill="#fff" />
    <rect x="20" y="3" width="1" height="6" fill="#000" />
    <rect x="20" y="8" width="6" height="1" fill="#000" />
    <rect x="21" y="4" width="1" height="1" fill="#000" />
    <rect x="22" y="5" width="1" height="1" fill="#000" />
    <rect x="23" y="6" width="1" height="1" fill="#000" />
    <rect x="24" y="7" width="1" height="1" fill="#000" />
    <rect x="9" y="7" width="8" height="2" fill="#0000a3" />
    <rect x="9" y="12" width="14" height="1" fill="#86898d" />
    <rect x="9" y="15" width="12" height="1" fill="#86898d" />
    <rect x="9" y="18" width="14" height="1" fill="#86898d" />
    <rect x="9" y="21" width="10" height="1" fill="#86898d" />
    <rect x="9" y="24" width="13" height="1" fill="#86898d" />
  </Px>
);

const ChatIcon = (props) => (
  <Px {...props}>
    <rect x="2" y="4" width="22" height="15" fill="#000" />
    <rect x="3" y="5" width="20" height="13" fill="#ffffc4" />
    <rect x="6" y="19" width="4" height="2" fill="#000" />
    <rect x="6" y="18" width="3" height="2" fill="#ffffc4" />
    <rect x="6" y="9" width="14" height="1" fill="#000" />
    <rect x="6" y="12" width="10" height="1" fill="#000" />
    <rect x="10" y="12" width="20" height="14" fill="#000" />
    <rect x="11" y="13" width="18" height="12" fill="#3e9697" />
    <rect x="24" y="26" width="4" height="3" fill="#000" />
    <rect x="25" y="25" width="2" height="2" fill="#3e9697" />
    <rect x="14" y="16" width="12" height="1" fill="#fff" />
    <rect x="14" y="19" width="12" height="1" fill="#fff" />
    <rect x="14" y="22" width="7" height="1" fill="#fff" />
  </Px>
);

const GithubIcon = (props) => (
  <Px {...props}>
    <rect x="9" y="4" width="14" height="2" fill="#000" />
    <rect x="6" y="6" width="20" height="2" fill="#000" />
    <rect x="4" y="8" width="24" height="12" fill="#000" />
    <rect x="6" y="20" width="20" height="2" fill="#000" />
    <rect x="8" y="22" width="5" height="2" fill="#000" />
    <rect x="19" y="22" width="5" height="2" fill="#000" />
    <rect x="12" y="24" width="8" height="4" fill="#000" />
    <rect x="9" y="12" width="14" height="7" fill="#fff" />
    <rect x="11" y="14" width="2" height="2" fill="#000" />
    <rect x="19" y="14" width="2" height="2" fill="#000" />
    <rect x="8" y="5" width="3" height="5" fill="#000" />
    <rect x="21" y="5" width="3" height="5" fill="#000" />
  </Px>
);

const LinkedinIcon = (props) => (
  <Px {...props}>
    <rect x="3" y="3" width="26" height="26" fill="#0a66c2" />
    <rect x="3" y="3" width="26" height="1" fill="#5ea5e8" />
    <rect x="7" y="7" width="4" height="4" fill="#fff" />
    <rect x="7" y="13" width="4" height="12" fill="#fff" />
    <rect x="14" y="13" width="4" height="12" fill="#fff" />
    <rect x="18" y="13" width="5" height="3" fill="#fff" />
    <rect x="21" y="15" width="4" height="10" fill="#fff" />
  </Px>
);

const CreditsIcon = (props) => (
  <Px {...props}>
    <rect x="15" y="2" width="2" height="4" fill="#000" />
    <rect x="13" y="6" width="6" height="4" fill="#000" />
    <rect x="3" y="10" width="26" height="3" fill="#000" />
    <rect x="6" y="13" width="20" height="4" fill="#000" />
    <rect x="8" y="17" width="16" height="4" fill="#000" />
    <rect x="7" y="21" width="7" height="4" fill="#000" />
    <rect x="18" y="21" width="7" height="4" fill="#000" />
    <rect x="5" y="25" width="6" height="3" fill="#000" />
    <rect x="21" y="25" width="6" height="3" fill="#000" />
    <rect x="15" y="4" width="2" height="5" fill="#ffd600" />
    <rect x="14" y="8" width="4" height="4" fill="#ffd600" />
    <rect x="5" y="11" width="22" height="1" fill="#ffd600" />
    <rect x="8" y="12" width="16" height="4" fill="#ffd600" />
    <rect x="10" y="16" width="12" height="4" fill="#ffd600" />
    <rect x="9" y="20" width="4" height="4" fill="#ffd600" />
    <rect x="19" y="20" width="4" height="4" fill="#ffd600" />
    <rect x="7" y="24" width="3" height="3" fill="#ffd600" />
    <rect x="22" y="24" width="3" height="3" fill="#ffd600" />
  </Px>
);

const MailIcon = (props) => (
  <Px {...props}>
    <rect x="3" y="7" width="26" height="18" fill="#000" />
    <rect x="4" y="8" width="24" height="16" fill="#fff" />
    <rect x="5" y="9" width="2" height="1" fill="#000" />
    <rect x="7" y="10" width="2" height="1" fill="#000" />
    <rect x="9" y="11" width="2" height="1" fill="#000" />
    <rect x="11" y="12" width="2" height="1" fill="#000" />
    <rect x="13" y="13" width="6" height="1" fill="#000" />
    <rect x="19" y="12" width="2" height="1" fill="#000" />
    <rect x="21" y="11" width="2" height="1" fill="#000" />
    <rect x="23" y="10" width="2" height="1" fill="#000" />
    <rect x="25" y="9" width="2" height="1" fill="#000" />
  </Px>
);

// Handset in a green bubble (phone / WhatsApp)
const PhoneIcon = (props) => (
  <Px {...props}>
    <rect x="4" y="4" width="24" height="20" fill="#000" />
    <rect x="5" y="5" width="22" height="18" fill="#25d366" />
    <rect x="6" y="24" width="5" height="3" fill="#000" />
    <rect x="7" y="23" width="3" height="2" fill="#25d366" />
    <rect x="9" y="8" width="4" height="4" fill="#fff" />
    <rect x="10" y="12" width="3" height="3" fill="#fff" />
    <rect x="12" y="14" width="3" height="3" fill="#fff" />
    <rect x="14" y="16" width="5" height="3" fill="#fff" />
    <rect x="19" y="15" width="4" height="4" fill="#fff" />
  </Px>
);

const ShutdownIcon = (props) => (
  <Px {...props}>
    <rect x="4" y="4" width="20" height="16" fill="#000" />
    <rect x="5" y="5" width="18" height="14" fill="#c3c6ca" />
    <rect x="7" y="7" width="14" height="10" fill="#000" />
    <rect x="10" y="20" width="8" height="2" fill="#86898d" />
    <rect x="6" y="22" width="16" height="3" fill="#c3c6ca" />
    <rect x="20" y="16" width="10" height="10" fill="#c00" />
    <rect x="21" y="17" width="8" height="8" fill="#f33" />
    <rect x="24" y="18" width="2" height="4" fill="#fff" />
    <rect x="22" y="20" width="1" height="4" fill="#fff" />
    <rect x="27" y="20" width="1" height="4" fill="#fff" />
    <rect x="23" y="23" width="4" height="1" fill="#fff" />
  </Px>
);

// The Start-button mark: four tiles spelling the "A" brand colours.
const StartIcon = (props) => (
  <Px size={16} {...props}>
    <rect x="1" y="2" width="6" height="5" fill="#e33" />
    <rect x="8" y="1" width="6" height="5" fill="#2b2" />
    <rect x="1" y="8" width="6" height="5" fill="#33d" />
    <rect x="8" y="7" width="6" height="5" fill="#ec2" />
    <rect x="0" y="14" width="16" height="1" fill="#000" opacity="0.25" />
  </Px>
);

const VolumeIcon = (props) => (
  <Px size={16} {...props}>
    <rect x="2" y="6" width="3" height="4" fill="#000" />
    <rect x="5" y="5" width="1" height="6" fill="#000" />
    <rect x="6" y="4" width="1" height="8" fill="#000" />
    <rect x="7" y="3" width="1" height="10" fill="#000" />
    <rect x="3" y="7" width="2" height="2" fill="#ffd600" />
    <rect x="10" y="6" width="1" height="4" fill="#000" />
    <rect x="12" y="4" width="1" height="8" fill="#000" />
  </Px>
);

const MinimizeGlyph = (props) => (
  <Px size={8} {...props}>
    <rect x="1" y="6" width="6" height="2" fill="#000" />
  </Px>
);

const MaximizeGlyph = (props) => (
  <Px size={8} {...props}>
    <rect x="0" y="0" width="8" height="8" fill="#000" />
    <rect x="1" y="2" width="6" height="5" fill="#c0c0c0" />
  </Px>
);

const CloseGlyph = (props) => (
  <Px size={8} {...props}>
    <path d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v2h1v1h1v1h1v1H6V7H5V6H3v1H2v1H0V7h1V6h1V5h1V3H2V2H1V1H0z" fill="#000" />
  </Px>
);

const ResizeGlyph = (props) => (
  <Px size={12} {...props}>
    <rect x="10" y="1" width="1" height="1" fill="#fff" />
    <rect x="9" y="2" width="1" height="1" fill="#86898d" />
    <rect x="10" y="5" width="1" height="1" fill="#fff" />
    <rect x="9" y="6" width="1" height="1" fill="#86898d" />
    <rect x="6" y="6" width="1" height="1" fill="#fff" />
    <rect x="5" y="7" width="1" height="1" fill="#86898d" />
    <rect x="10" y="9" width="1" height="1" fill="#fff" />
    <rect x="9" y="10" width="1" height="1" fill="#86898d" />
    <rect x="6" y="9" width="1" height="1" fill="#fff" />
    <rect x="5" y="10" width="1" height="1" fill="#86898d" />
    <rect x="2" y="9" width="1" height="1" fill="#fff" />
    <rect x="1" y="10" width="1" height="1" fill="#86898d" />
  </Px>
);

const icons = {
  computer: ComputerIcon,
  showcase: ShowcaseIcon,
  document: DocumentIcon,
  chat: ChatIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  credits: CreditsIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  shutdown: ShutdownIcon,
  start: StartIcon,
  volume: VolumeIcon,
  minimize: MinimizeGlyph,
  maximize: MaximizeGlyph,
  close: CloseGlyph,
  resize: ResizeGlyph,
};

const Icon = ({ name, ...rest }) => {
  const Component = icons[name];
  return Component ? <Component {...rest} /> : null;
};

export default Icon;
