"use client";
import { useState } from "react";

import { IoMdVolumeHigh } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import styles from './main.module.css';

export default function Dictionary() {
    const [data, setData] = useState(null);
    const [word, setWord] = useState("");
    const [error, setError] = useState(""); // State for error handling
    const [loading, setLoading] = useState(false); // State for loading indicator

    async function getMeaning() {
        setLoading(true); // Set loading to true when starting the API call
        setError(""); // Clear any previous errors

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
            const result = await response.json();

            if (response.ok && result.length > 0) {
                setData(result[0]);
                setError(""); // Clear error if word is found
            } else {
                setData(null); // Clear data if no result is found
                setError("Word not found. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching the data.");
        }

        setLoading(false); // Set loading to false after the API call is complete
    }

    function playAudio() {
        if (data && data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
            const audio = new Audio(data.phonetics[0].audio);
            audio.play();
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                Dictionary <span>App</span>{' '}
            </h1>
            <div className={styles.searchBox}>
                <input
                    className={styles.Input}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => {
                        setWord(e.target.value);
                    }}
                />
                <button className={styles.button}
                    onClick={() => {
                        getMeaning();
                    }}
                >
                    <FaSearch />
                </button>
            </div>

            {/* Show loading circle while data is being fetched */}
            {loading && (
                <div className={styles.loadingCircle}></div>
            )}

            {/* Error Message */}
            {error && <p className={styles.error}>{error}</p>}

            {data && !loading && (
                <div className="showResults">
                    <h2 className={styles.h2}>{data.word}</h2>
                    <button className={styles.volume}
                        onClick={() => {
                            playAudio();
                        }}
                    >
                        <IoMdVolumeHigh />
                    </button>
                    <div className={styles.tablecontainer}>
                        <table className={styles.table}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Parts of Speech:</td>
                                <td className={styles.td}>{data.meanings[0].partOfSpeech}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Definition:</td>
                                <td className={styles.td}>{data.meanings[0].definitions[0].definition}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Example:</td>
                                <td className={styles.td}>{data.meanings[0].definitions[0].example || "N/A"}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            )}

            <div className={styles.footer}>
                <a className={styles.name} href="https://harnoordhindsa.vercel.app" target="_blank">Harnoor Dhindsa</a>
                <div className={styles.socialIcons}>
                    <a href="https://github.com/Harnoor-Dhindsa" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/harnoor-dhindsa-930a62303/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}
