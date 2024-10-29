interface ReactionProps {
  isDisliked: boolean,
  handleReaction: () => void
}

const Dislike: React.FC<ReactionProps> = ({ isDisliked, handleReaction }) => {
  return(
    <svg
      width="25px"
      height="25px"
      fill={
        isDisliked ? "#ff0000" : "#000000"
      }
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke={
        isDisliked ? "#ff0000" : "#000000"
      }
      onClick={handleReaction}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M3,21a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H6V21ZM19.949,10H14.178V5c0-2-3.076-2-3.076-2s0,4-1.026,5C9.52,8.543,8.669,10.348,8,11V21H18.644a2.036,2.036,0,0,0,2.017-1.642l1.3-7A2.015,2.015,0,0,0,19.949,10Z"></path>
      </g>
    </svg>
  )
}

export default Dislike