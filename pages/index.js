import Link from 'next/link';
import { DatePicker } from 'antd';
import '../styles/index.scss';

export default () => (
    <div className="welcome">
        Welcome to next.js!<br />
        Click <Link href="/fetchdata">here</Link> to check the fetch data<br />
        <DatePicker />
    </div>
)
