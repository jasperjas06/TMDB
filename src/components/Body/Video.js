/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable import/no-anonymous-default-export */
export default function YoutubeEmbed({ youtubeId }){
  return (
    <div
      className="video"
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* 16:9 */,
        paddingTop: 25,
        width: "50%",
        height: "50%"
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
      />
    </div>
  );
};