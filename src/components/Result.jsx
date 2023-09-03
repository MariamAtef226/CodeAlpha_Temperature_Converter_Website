export default function Result({ unit, value, unitSym }) {
    return (
        <div className="d-flex mt-2">
            <div className="unit text-start p-2">{unit}</div>
            <div className="value p-2 text-start bg-light">{value}</div>
            <div className="unit-ab w-25 text-light fw-bold p-2">{unitSym}</div>
        </div>);


}