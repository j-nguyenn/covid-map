const DEFAULT_CASE = 1000000;

const getSize = (cases: number) => {
  if (cases / DEFAULT_CASE > 10) {
    return 10;
  }
  if (cases / DEFAULT_CASE < 1) {
    return 1;
  }
  return cases / DEFAULT_CASE;
};

const getStyle = (cases: number) => {
  const size = getSize(cases);
  return `width: ${size}rem; height: ${size}rem; margin-left: -${
    size / 2
  }rem; margin-top: -${size / 2}rem`;
};
const getMarkerHTML = (props: any) => {
  const { country, updated, cases, deaths, recovered } = props;

  let updatedFormatted;
  let casesString = `${cases}`;
  if (cases > 1000) {
    casesString = `${casesString.slice(0, -3)}k+`;
  }

  if (updated) {
    updatedFormatted = new Date(updated).toLocaleString();
  }

  const html = `
  <div class="marker-container">
    <span class="icon-marker-tooltip">
        <h2>${country}</h2>
        <ul>
        <li><strong>Confirmed:</strong> ${cases}</li>
        <li><strong>Deaths:</strong> ${deaths}</li>
        <li><strong>Recovered:</strong> ${recovered}</li>
        <li><strong>Last Update:</strong> ${updatedFormatted}</li>
        </ul>
    </span>
    <span class="icon-marker" style="${getStyle(cases)}">
        ${casesString}
    </span>
  </div>
        `;

  return html;
};

export { getMarkerHTML };
