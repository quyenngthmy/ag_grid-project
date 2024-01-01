export interface Athlete {
  id: number;
  athlete: string;
  age: number;
  country: string;
  sport: string;
  date: string;
  year: number;
}

function* getId(reset: boolean = false) {
  let id = 0;
  while (true) {
    if (reset) id = 0;
    yield ++id;
  }
  return -1;
}
const idGenerator = getId();

function attachId(data: Omit<Athlete, "id">[]): Athlete[] {
  return data.map((a) => ({ ...a, id: idGenerator.next().value }));
}

export function fetchLargeData() {
  const dataUrl = "https://www.ag-grid.com/example-assets/olympic-winners.json";
  return fetch(dataUrl)
    .then((r) => r.json())
    .then((data) => attachId(data));
}
