"use client";

import type React from "react";
import { useState } from "react";

export interface AdminCRUDState<T, DeleteId = number> {
  items: T[];
  loading: boolean;
  editingItem: T | null;
  isFormOpen: boolean;
  itemToDelete: DeleteId | null;
  isDeleteOpen: boolean;
}

export interface AdminCRUDHandlers<T, DeleteId = number> {
  openAdd: () => void;
  openEdit: (item: T) => void;
  openDelete: (id: DeleteId) => void;
  closeForm: () => void;
  closeDelete: () => void;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAdminCRUD<T, DeleteId = number>(): AdminCRUDState<
  T,
  DeleteId
> &
  AdminCRUDHandlers<T, DeleteId> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DeleteId | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const openDelete = (id: DeleteId) => {
    setItemToDelete(id);
    setIsDeleteOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  return {
    items,
    loading,
    editingItem,
    isFormOpen,
    itemToDelete,
    isDeleteOpen,
    openAdd,
    openEdit,
    openDelete,
    closeForm,
    closeDelete,
    setItems,
    setLoading,
  };
}
