import React, { Suspense } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export const MasterLayoutProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="global-wrap">
            <div className="global-content">
                <Header />
                <Suspense>
                    <div>{children}</div>
                </Suspense>
                <Footer />
            </div>
        </div>
    );
};

export default MasterLayoutProvider;
