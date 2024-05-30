const calculateAge = (birthDate: string, otherDate: string): number => {
    function parseDate(dateStr) {
        const parts = dateStr.split('-');
        // parts[0] = year, parts[1] = month, parts[2] = day
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    // Parse the input dates
    const birth = parseDate(birthDate);
    const other = parseDate(otherDate);

    // Calculate the difference in years
    let years = other.getFullYear() - birth.getFullYear();

    // Adjust for cases where the birth date hasn't occurred yet in the other year
    if (
        other.getMonth() < birth.getMonth() ||
        (other.getMonth() === birth.getMonth() && other.getDate() < birth.getDate())
    ) {
        years--;
    }

    return years;
}

export default calculateAge;