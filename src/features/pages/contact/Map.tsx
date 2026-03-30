const Map = ({ map }: { map: string }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
      <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src={map} width="100%" height="380" style={{ border: 0 }}
          allowFullScreen loading="lazy" title="Map"
        ></iframe>
      </div>
    </>
  );
}

export default Map;