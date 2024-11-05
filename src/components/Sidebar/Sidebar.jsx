import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context';
const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt);
    }
    return (
        <div className = 'sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="menu icon" />
                {extended ? <div onClick={() => newChat()} className="new-chat">
                    <img src= {assets.plus_icon} alt="plus icon" />
                    <p>New Chat</p>
                </div> : null }
                {extended ?
                <div className='recent'>
                    <p className="recent-title">Recent</p>
                    <div className='scroll-items'>
                    {prevPrompts.map((item, index) => {
                        return (
                            <div onClick={() => loadPrompt(item)} className='recent-entry'>
                                <img src={assets.message_icon} alt="message icon" />
                                <p>{item.slice(0, 18)} ...</p>
                            </div>
                        )
                    })
                    }</div>
                </div> : null }
            </div>
            <div className="bottom">
                <div className='bottom-item recent-entry'>
                    <img src= {assets.question_icon} alt="question icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src= {assets.history_icon} alt="question icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src= {assets.setting_icon} alt="question icon" />
                   {extended ?  <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar