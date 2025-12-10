import React, { useEffect } from 'react';
import StackingCards from '../components/ui/stacking-card';
import { projects } from '../data/portfolioData';

const AllProjects = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <StackingCards projects={projects} />
    );
};

export default AllProjects;
