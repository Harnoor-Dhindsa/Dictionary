"use client";
import { useState } from "react";

import { IoMdVolumeHigh } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import styles from './main.module.css';


export default function Dictionary() {
    const [data, setData] = useState("");
    const [word, setWord] = useState("");

    async function getMeaning() {
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
            const data = await response.json();
            setData(data[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function playAudio() {
        if (data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
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
          {data && ( 
            <div className="showResults"> 
              <h2 className={styles.h2}>{data.word}</h2> 
              <button 
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
                    <td className={styles.td}>{data.meanings[0].definitions[0].example}</td> 
                  </tr> 
                </table> 
              </div> 
            </div> 
          )} 
        </div> 
      );
};