"use client";

import {
  Button,
  Input,
  InputGroup,
  Label,
  ListBox,
  Modal,
  Select,
  Table,
  toast,
} from "@heroui/react";
import { useState } from "react";
import ParticipantSearch from "@/components/admin/ParticipantSearch";
import { addBadge } from "@/lib/actions/add-badge";
import { addBadgeDegree } from "@/lib/actions/add-badge-degree";
import { addBadgeScorer } from "@/lib/actions/add-badge-scorer";
import { deleteBadge } from "@/lib/actions/delete-badge";
import { deleteBadgeDegree } from "@/lib/actions/delete-badge-degree";
import { editBadge } from "@/lib/actions/edit-badge";
import { editBadgeDegree } from "@/lib/actions/edit-badge-degree";
import { editBadgeScorer } from "@/lib/actions/edit-badge-scorer";
import { getBadgeScorers } from "@/lib/actions/get-badge-scorers";
import { removeBadgeScorer } from "@/lib/actions/remove-badge-scorer";
import type {
  BadgeDegreeWithCount,
  BadgeScorerWithDetails,
  BadgeWithDegrees,
} from "@/types";

type Props = {
  initialBadges: BadgeWithDegrees[];
};

export default function BadgeScorerManager({ initialBadges }: Readonly<Props>) {
  const [badges, setBadges] = useState(initialBadges);
  const [selectedBadge, setSelectedBadge] = useState<BadgeWithDegrees | null>(
    null,
  );
  const [scorers, setScorers] = useState<BadgeScorerWithDetails[]>([]);
  const [loadingScorers, setLoadingScorers] = useState(false);

  // Badge modal state
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<BadgeWithDegrees | null>(
    null,
  );
  const [badgeName, setBadgeName] = useState("");
  const [badgeSlug, setBadgeSlug] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [badgeRulesPageId, setBadgeRulesPageId] = useState("");

  // Degree form state
  const [degreeName, setDegreeName] = useState("");
  const [degreeDescription, setDegreeDescription] = useState("");
  const [degreeSortOrder, setDegreeSortOrder] = useState("0");
  const [editingDegree, setEditingDegree] =
    useState<BadgeDegreeWithCount | null>(null);

  // Scorer form state
  const [scorerParticipantId, setScorerParticipantId] = useState<number | null>(
    null,
  );
  const [scorerParticipantName, setScorerParticipantName] = useState("");
  const [scorerDegreeId, setScorerDegreeId] = useState<number | null>(null);
  const [scorerDate, setScorerDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [editingScorer, setEditingScorer] =
    useState<BadgeScorerWithDetails | null>(null);

  const getToday = () => new Date().toISOString().slice(0, 10);

  const resetDegreeForm = () => {
    setDegreeName("");
    setDegreeDescription("");
    setDegreeSortOrder("0");
    setEditingDegree(null);
  };

  const resetScorerForm = () => {
    setScorerParticipantId(null);
    setScorerParticipantName("");
    setScorerDegreeId(null);
    setScorerDate(getToday());
    setEditingScorer(null);
  };

  const refreshBadges = async () => {
    const { getBadges } = await import("@/lib/actions/get-badges");
    const fresh = await getBadges();
    setBadges(fresh);
    if (selectedBadge) {
      const updated = fresh.find((b) => b.id === selectedBadge.id);
      if (updated) setSelectedBadge(updated);
    }
  };

  const loadScorers = async (badgeId: number) => {
    setLoadingScorers(true);
    try {
      const data = await getBadgeScorers(badgeId);
      setScorers(data);
    } catch {
      toast.danger("Błąd", { description: "Nie udało się pobrać zdobywców" });
    } finally {
      setLoadingScorers(false);
    }
  };

  const handleSelectBadge = async (badge: BadgeWithDegrees) => {
    resetDegreeForm();
    resetScorerForm();
    setScorers([]);
    setSelectedBadge(badge);
    await loadScorers(badge.id);
  };

  // Badge CRUD
  const openAddBadge = () => {
    setEditingBadge(null);
    setBadgeName("");
    setBadgeSlug("");
    setBadgeDescription("");
    setBadgeRulesPageId("");
    setBadgeModalOpen(true);
  };

  const openEditBadge = (badge: BadgeWithDegrees) => {
    setEditingBadge(badge);
    setBadgeName(badge.name);
    setBadgeSlug(badge.slug);
    setBadgeDescription(badge.description ?? "");
    setBadgeRulesPageId(badge.rules_page_id?.toString() ?? "");
    setBadgeModalOpen(true);
  };

  const handleSaveBadge = async () => {
    try {
      const data = {
        name: badgeName,
        slug: badgeSlug,
        description: badgeDescription || undefined,
        rules_page_id: badgeRulesPageId ? Number(badgeRulesPageId) : undefined,
      };

      if (editingBadge) {
        await editBadge({ id: editingBadge.id, ...data });
        toast.success("Sukces", { description: "Odznaka zaktualizowana" });
      } else {
        await addBadge(data);
        toast.success("Sukces", { description: "Odznaka dodana" });
      }

      setBadgeModalOpen(false);
      setEditingBadge(null);
      await refreshBadges();
    } catch (error) {
      toast.danger("Błąd", {
        description: error instanceof Error ? error.message : "Wystąpił błąd",
      });
    }
  };

  const handleDeleteBadge = async (badgeId: number) => {
    if (!confirm("Czy na pewno chcesz usunąć tę odznakę?")) return;
    try {
      await deleteBadge(badgeId);
      toast.success("Sukces", { description: "Odznaka usunięta" });
      if (selectedBadge?.id === badgeId) {
        setSelectedBadge(null);
        setScorers([]);
        resetDegreeForm();
        resetScorerForm();
      }
      await refreshBadges();
    } catch (error) {
      toast.danger("Błąd", {
        description: error instanceof Error ? error.message : "Wystąpił błąd",
      });
    }
  };

  // Degree CRUD
  const handleSaveDegree = async () => {
    if (!selectedBadge) return;
    try {
      const data = {
        badge_id: selectedBadge.id,
        name: degreeName,
        description: degreeDescription || undefined,
        sort_order: Number(degreeSortOrder),
      };

      if (editingDegree) {
        await editBadgeDegree({ id: editingDegree.id, ...data });
        toast.success("Sukces", { description: "Stopień zaktualizowany" });
      } else {
        await addBadgeDegree(data);
        toast.success("Sukces", { description: "Stopień dodany" });
      }

      resetDegreeForm();
      await refreshBadges();
    } catch (error) {
      toast.danger("Błąd", {
        description: error instanceof Error ? error.message : "Wystąpił błąd",
      });
    }
  };

  const handleDeleteDegree = async (degreeId: number) => {
    if (!confirm("Czy na pewno chcesz usunąć ten stopień?")) return;
    try {
      await deleteBadgeDegree(degreeId);
      toast.success("Sukces", { description: "Stopień usunięty" });
      await refreshBadges();
    } catch (error) {
      toast.danger("Błąd", {
        description: error instanceof Error ? error.message : "Wystąpił błąd",
      });
    }
  };

  // Scorer CRUD
  const handleSaveScorer = async () => {
    if (!selectedBadge) return;
    try {
      const participantId =
        editingScorer?.participant_id ?? scorerParticipantId;

      if (editingScorer) {
        await editBadgeScorer({
          id: editingScorer.id,
          degree_id: scorerDegreeId ?? undefined,
          date: scorerDate,
        });
        toast.success("Sukces", { description: "Zdobywca zaktualizowany" });
      } else {
        if (!participantId) return;
        await addBadgeScorer({
          participant_id: participantId,
          badge_id: selectedBadge.id,
          degree_id: scorerDegreeId ?? undefined,
          date: scorerDate,
        });
        toast.success("Sukces", { description: "Zdobywca dodany" });
      }

      resetScorerForm();
      await loadScorers(selectedBadge.id);
      await refreshBadges();
    } catch (error) {
      toast.danger("Błąd", {
        description: error instanceof Error ? error.message : "Wystąpił błąd",
      });
    }
  };

  const handleRemoveScorer = async (scorerId: number) => {
    if (!confirm("Czy na pewno chcesz usunąć tego zdobywcę?")) return;
    try {
      await removeBadgeScorer(scorerId);
      toast.success("Sukces", { description: "Zdobywca usunięty" });
      if (selectedBadge) {
        await loadScorers(selectedBadge.id);
      }
      await refreshBadges();
    } catch (error) {
      toast.danger("Błąd", {
        description: error instanceof Error ? error.message : "Wystąpił błąd",
      });
    }
  };

  const startEditScorer = (scorer: BadgeScorerWithDetails) => {
    setEditingScorer(scorer);
    setScorerParticipantId(scorer.participant_id);
    setScorerParticipantName(scorer.participant.name);
    setScorerDegreeId(scorer.degree_id);
    setScorerDate(new Date(scorer.date).toISOString().slice(0, 10));
  };

  return (
    <div className="space-y-8">
      {/* Badge List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">Odznaki</h2>
          <Button onPress={openAddBadge} variant="primary">
            Dodaj odznakę
          </Button>
        </div>
        <div className="grid gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`w-full text-left p-4 border rounded-lg transition-colors ${
                selectedBadge?.id === badge.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{badge.name}</h3>
                  <p className="text-sm text-gray-500">
                    Slug: {badge.slug} | Stopni: {badge.degrees.length} |
                    Zdobywców: {badge._count.scorers}
                  </p>
                  {badge.description && (
                    <p className="text-sm mt-1">{badge.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onPress={() => handleSelectBadge(badge)}>
                    Wybierz
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onPress={() => openEditBadge(badge)}
                  >
                    Edytuj
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onPress={() => handleDeleteBadge(badge.id)}
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Badge Details */}
      {selectedBadge && (
        <>
          {/* Degrees Section */}
          <section>
            <h2 className="text-2xl mb-4">Stopnie — {selectedBadge.name}</h2>
            <div className="mb-4 p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                {editingDegree ? "Edytuj stopień" : "Dodaj stopień"}
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Nazwa</Label>
                  <Input
                    value={degreeName}
                    onChange={(e) => setDegreeName(e.target.value)}
                    placeholder="np. Zielony"
                  />
                </div>
                <div>
                  <Label>Opis</Label>
                  <Input
                    value={degreeDescription}
                    onChange={(e) => setDegreeDescription(e.target.value)}
                    placeholder="Wymagania..."
                  />
                </div>
                <div>
                  <Label>Kolejność</Label>
                  <Input
                    type="number"
                    value={degreeSortOrder}
                    onChange={(e) => setDegreeSortOrder(e.target.value)}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button onPress={handleSaveDegree} variant="primary">
                    {editingDegree ? "Zapisz" : "Dodaj"}
                  </Button>
                  {editingDegree && (
                    <Button
                      onPress={() => {
                        resetDegreeForm();
                      }}
                      variant="secondary"
                    >
                      Anuluj
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Stopnie odznaki"
                  className="min-w-3xl"
                >
                  <Table.Header>
                    <Table.Column isRowHeader>Nazwa</Table.Column>
                    <Table.Column>Opis</Table.Column>
                    <Table.Column>Kolejność</Table.Column>
                    <Table.Column>Zdobywców</Table.Column>
                    <Table.Column>Akcje</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {selectedBadge.degrees.map((degree) => {
                      return (
                        <Table.Row key={degree.id}>
                          <Table.Cell>{degree.name}</Table.Cell>
                          <Table.Cell>{degree.description ?? "—"}</Table.Cell>
                          <Table.Cell>{degree.sort_order}</Table.Cell>
                          <Table.Cell>{degree._count?.scorers ?? 0}</Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onPress={() => {
                                  setEditingDegree(degree);
                                  setDegreeName(degree.name);
                                  setDegreeDescription(
                                    degree.description ?? "",
                                  );
                                  setDegreeSortOrder(
                                    degree.sort_order.toString(),
                                  );
                                }}
                              >
                                Edytuj
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onPress={() => handleDeleteDegree(degree.id)}
                              >
                                Usuń
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </section>

          {/* Scorers Section */}
          <section>
            <h2 className="text-2xl mb-4">Zdobywcy — {selectedBadge.name}</h2>
            <div className="mb-4 p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                {editingScorer ? "Edytuj zdobywcę" : "Dodaj zdobywcę"}
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <ParticipantSearch
                    selectedParticipantId={scorerParticipantId}
                    participantName={scorerParticipantName}
                    isDisabled={Boolean(editingScorer)}
                    onSelect={(p) => {
                      setScorerParticipantId(p.id);
                      setScorerParticipantName(p.name);
                    }}
                    onInputChange={(value) => {
                      setScorerParticipantName(value);
                      if (!value) setScorerParticipantId(null);
                    }}
                  />
                </div>
                <div>
                  <Select
                    value={scorerDegreeId ?? null}
                    onChange={(key) => {
                      setScorerDegreeId(key ? Number(key) : null);
                    }}
                    placeholder="Wybierz stopień"
                  >
                    <Label>Stopień</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {selectedBadge.degrees.map((degree) => (
                          <ListBox.Item
                            id={degree.id}
                            key={degree.id}
                            textValue={degree.name}
                          >
                            {degree.name}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
                <div>
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={scorerDate}
                    onChange={(e) => setScorerDate(e.target.value)}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button onPress={handleSaveScorer} variant="primary">
                    {editingScorer ? "Zapisz" : "Dodaj"}
                  </Button>
                  {editingScorer && (
                    <Button
                      onPress={() => {
                        resetScorerForm();
                      }}
                      variant="secondary"
                    >
                      Anuluj
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {loadingScorers ? (
              <p>Ładowanie...</p>
            ) : (
              <Table>
                <Table.ScrollContainer>
                  <Table.Content
                    aria-label="Zdobywcy odznaki"
                    className="min-w-3xl"
                  >
                    <Table.Header>
                      <Table.Column isRowHeader>Uczestnik</Table.Column>
                      <Table.Column>Klub / miasto</Table.Column>
                      <Table.Column>Stopień</Table.Column>
                      <Table.Column>Data</Table.Column>
                      <Table.Column>Akcje</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {scorers.map((scorer) => (
                        <Table.Row key={scorer.id}>
                          <Table.Cell>{scorer.participant.name}</Table.Cell>
                          <Table.Cell>{scorer.participant.origin}</Table.Cell>
                          <Table.Cell>{scorer.degree?.name ?? "—"}</Table.Cell>
                          <Table.Cell>
                            {new Date(scorer.date).toLocaleDateString("pl-PL")}
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onPress={() => startEditScorer(scorer)}
                              >
                                Edytuj
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onPress={() => handleRemoveScorer(scorer.id)}
                              >
                                Usuń
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            )}
          </section>
        </>
      )}

      {/* Badge Add/Edit Modal */}
      <Modal>
        <Modal.Backdrop
          isOpen={badgeModalOpen}
          onOpenChange={setBadgeModalOpen}
        >
          <Modal.Container>
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header>
                    <Modal.Heading className="text-lg font-semibold">
                      {editingBadge ? "Edytuj odznakę" : "Dodaj odznakę"}
                    </Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Label htmlFor="badge-name" className="w-12 shrink-0">
                          Nazwa
                        </Label>
                        <Input
                          id="badge-name"
                          className="flex-1"
                          value={badgeName}
                          onChange={(e) => setBadgeName(e.target.value)}
                          placeholder="np. Z Dreptusiem po Polsce"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <Label htmlFor="badge-slug" className="w-12 shrink-0">
                          Slug
                        </Label>
                        <Input
                          id="badge-slug"
                          className="flex-1"
                          value={badgeSlug}
                          onChange={(e) => setBadgeSlug(e.target.value)}
                          placeholder="np. z-dreptusiem-po-polsce"
                        />
                      </div>
                      <div className="flex items-start gap-4">
                        <Label
                          htmlFor="badge-description"
                          className="w-12 shrink-0 pt-2"
                        >
                          Opis
                        </Label>
                        <InputGroup className="flex-1">
                          <InputGroup.TextArea
                            id="badge-description"
                            value={badgeDescription}
                            onChange={(e) =>
                              setBadgeDescription(e.target.value)
                            }
                            placeholder="Opis odznaki..."
                            rows={3}
                          />
                        </InputGroup>
                      </div>
                      <div className="">
                        <Label htmlFor="badge-rules-page-id" className="block">
                          ID strony z regulaminem (WordPress)
                        </Label>
                        <Input
                          id="badge-rules-page-id"
                          className="flex-1"
                          type="number"
                          value={badgeRulesPageId}
                          onChange={(e) => setBadgeRulesPageId(e.target.value)}
                          placeholder="np. 123"
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onPress={close} variant="secondary">
                      Anuluj
                    </Button>
                    <Button onPress={handleSaveBadge} variant="primary">
                      {editingBadge ? "Zapisz" : "Dodaj"}
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
