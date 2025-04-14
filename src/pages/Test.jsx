export default function Test({ value }) {
  return (
  <div className="radial-progress" style={{ "--value": value }} aria-valuenow={value} role="progressbar">
    { value }%
  </div>
  )
}