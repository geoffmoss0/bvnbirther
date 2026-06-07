export default function modifier(stat) {

    // remove scamp line since it will be added in later
    if (stat.includes('checks')) {
        stat = parseInt(stat);
    }

    if (stat <= 4) {
        return "-3";
    } else if (stat <= 6) {
        return "-2";
    } else if (stat <= 8) {
        return "-1";
    } else if (stat <= 12) {
        return "0";
    } else if (stat <= 14) {
        return "+1";
    } else if (stat <= 16) {
        return "+2";
    } else {
        return "+3";
    }
}