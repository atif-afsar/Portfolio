import ResumeBox from "./ResumeBox.jsx";
import { work, education, hostname } from "../profile.js";

// "The BrandsWay | PR & Marketing Agency" -> ["The BrandsWay", "PR & Marketing Agency"]
const splitCompany = (company) => company.split("|").map((s) => s.trim());

const Entry = ({ item }) => {
  const [name, kind] = splitCompany(item.company);
  return (
    <section>
      <div className="header-row">
        <h1>{name}</h1>
        {item.website ? (
          <a href={item.website} target="_blank" rel="noopener noreferrer">
            <h4>{hostname(item.website)}</h4>
          </a>
        ) : (
          kind && <h4>{kind}</h4>
        )}
      </div>
      {item.website && kind && <p style={{ fontSize: 15, color: "#444" }}>{kind}</p>}
      <div className="header-row" style={{ marginTop: 8 }}>
        <h3>{item.role}</h3>
        <p>
          <b>{item.duration}</b>
        </p>
      </div>
      <div className="text-block" style={item.points.length ? undefined : { margin: "0 0 24px" }}>
        <ul style={{ paddingLeft: 24 }}>
          {item.points.map((point) => (
            <li key={point}>
              <p>{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Experience = () => (
  <article>
    <ResumeBox />
    {work.map((item) => (
      <Entry key={item.role + item.duration} item={item} />
    ))}
    <h2 style={{ margin: "16px 0 24px" }}>Education</h2>
    {education.map((item) => (
      <Entry key={item.role} item={item} />
    ))}
  </article>
);

export default Experience;
