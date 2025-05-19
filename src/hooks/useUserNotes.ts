
import { useState, useEffect } from 'react';

export const useUserNotes = () => {
  const saveNote = (conceptId: string, content: string) => {
    try {
      const existingNotes = JSON.parse(localStorage.getItem('userNotes') || '{}');
      existingNotes[conceptId] = content;
      localStorage.setItem('userNotes', JSON.stringify(existingNotes));
      return true;
    } catch (error) {
      console.error('Error saving note:', error);
      return false;
    }
  };

  const getNoteForConcept = (conceptId: string) => {
    try {
      const existingNotes = JSON.parse(localStorage.getItem('userNotes') || '{}');
      return existingNotes[conceptId] || '';
    } catch (error) {
      console.error('Error getting note:', error);
      return '';
    }
  };

  const getAllNotes = () => {
    try {
      return JSON.parse(localStorage.getItem('userNotes') || '{}');
    } catch (error) {
      console.error('Error getting all notes:', error);
      return {};
    }
  };

  const deleteNote = (conceptId: string) => {
    try {
      const existingNotes = JSON.parse(localStorage.getItem('userNotes') || '{}');
      delete existingNotes[conceptId];
      localStorage.setItem('userNotes', JSON.stringify(existingNotes));
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  };

  return {
    saveNote,
    getNoteForConcept,
    getAllNotes,
    deleteNote
  };
};

export default useUserNotes;
