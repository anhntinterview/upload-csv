import MasterLayoutProvider from "./layout/MasterLayoutProvider";
import HomeComponent from "./component/Home";

export default function Home() {
    return (
        <div className="">
            <MasterLayoutProvider>
                <HomeComponent />
            </MasterLayoutProvider>
        </div>
    );
}
