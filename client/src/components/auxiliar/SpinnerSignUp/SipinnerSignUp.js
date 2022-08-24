import style from './SpinnerSignUp.module.css'

export default function Spinner() {
    return (
        <div className={style.Container}>
            <div className={style.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
