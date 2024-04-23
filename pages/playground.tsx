export default function Playground() {
  const bluePrintsUrl = "https://wpbones.vercel.app/blueprint.json";

  // https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/adamziel/blueprints/trunk/blueprints/latest-gutenberg/blueprint.json
  return <iframe src={`https://playground.wordpress.net/?blueprint-url=${bluePrintsUrl}`}></iframe>;
}
