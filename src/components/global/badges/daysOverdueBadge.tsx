
type DaysOverdueBadgeProps = {
  daysOverdue: number
}

const DaysOverdueBadge: React.FC<DaysOverdueBadgeProps> = (props) => {

  return (
    <>
      <div className={`${daysOverdueBgColour(props.daysOverdue)} rounded-lg px-2 py-1`}>
        <span className={`${daysOverdueTextColour(props.daysOverdue)} text-xs font-semibold tracking-tight`}>{props.daysOverdue}</span>
      </div>
    </>
  )

  // Rules for colour:
  // 0-7 days: yellow
  // 8-14 days: orange
  // 15+ days: red

  function daysOverdueBgColour(daysOverdue: number) {

    if (daysOverdue >= 0 && daysOverdue <= 7) {
      return "bg-yellow-500";
    } else if (daysOverdue >= 8 && daysOverdue <= 14) {
      return "bg-amber-500";
    } else if (daysOverdue >= 15) {
      return "bg-red-500";
    } else {
      return "bg-gray-300";
    }

  }

  function daysOverdueTextColour(daysOverdue: number) {

    if (daysOverdue >= 0 && daysOverdue <= 7) {
      return "text-yellow-100";
    } else if (daysOverdue >= 8 && daysOverdue <= 14) {
      return "text-amber-100";
    } else if (daysOverdue >= 15) {
      return "text-red-100";
    } else {
      return "text-gray-100";
    }
  }

}

export default DaysOverdueBadge;