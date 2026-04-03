const Map = ({ map }: { map: string }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
      <div className="w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
        <iframe src={map} className="w-full h-95" loading="lazy" title="Map" />
      </div>
    </>
  );
}

export default Map;